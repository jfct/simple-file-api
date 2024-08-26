import { EntityManager, In } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateFileDto, ResponseFileDto, ResponseTopShared } from "../dto/file.dto";
import { File } from "../entity/file.entity";
import { Group } from "../entity/group.entity";
import { NotFoundException } from "../errors/notfound.exception";
import { BaseService } from "./base.service";

export class FileService extends BaseService<File> {
    constructor() {
        super(AppDataSource.getRepository(File));
    }

    async create(payload: CreateFileDto): Promise<File> {
        return AppDataSource.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            // Validate groups
            let groups: Group[] = [];
            if (payload.groups && payload.groups.length > 0) {
                groups = await transactionalEntityManager.find(Group, {
                    where: { id: In(payload.groups) }
                });
                if (groups.length !== payload.groups.length) {
                    throw new NotFoundException("One or more groups not found");
                }
            }

            // Create and save the file
            const file = new File();
            file.name = payload.name;
            file.risk = payload.risk;
            file.groups = groups;

            return transactionalEntityManager.save(file);
        });
    }

    async get(id: number): Promise<ResponseFileDto | null> {
        // Get all the groups associated to a file
        // Also get all the users from those groups
        const file = await this.repository.createQueryBuilder("file")
            .innerJoinAndSelect("file.groups", "group")
            .innerJoinAndSelect("group.users", "user")
            .where("file.id = :id", { id })
            .getOne();

        if (!file) {
            throw new NotFoundException("No file found");
        }

        const userIds = new Set<number>();
        const groupIds: number[] = [];

        // We keep all the userids on a set, so we do not add duplicates!
        file.groups.forEach(group => {
            groupIds.push(group.id);
            group.users.forEach(user => userIds.add(user.id));
        });

        return {
            name: file.name,
            risk: file.risk,
            users: Array.from(userIds),
            groups: groupIds
        };

    }

    async shareFileWithGroup(fileId: number, groupId: number): Promise<File | null> {
        const file = await this.repository.findOne({
            where: { id: fileId },
            relations: ["groups"]
        });
        const group = await AppDataSource.getRepository(Group).findOne({ where: { id: groupId } });

        if (!file) {
            throw new NotFoundException("No file found");
        }
        if (!group) {
            throw new NotFoundException("No group found");
        }

        file.groups.push(group);

        return this.repository.save(file);
    }

    /**
     * I was deciding between using a raw SQL query or using typeorm
     * 
     * I decided to go with the typeORM for readability since that's ahead of the efficiency. But it is 
     * possible to do this with just one query, just for curiosity i'll leave it here
     * 
     *        WITH topFileIds AS (
            SELECT file.id AS file_id
            FROM 
                files file
            INNER JOIN file_groups file_group ON file_group.file_id = file.id
            INNER JOIN groups grp ON grp.id = file_group.group_id
            INNER JOIN group_users user_group ON user_group.group_id = grp.id
            INNER JOIN users usr ON usr.id = user_group.user_id
            GROUP BY 
                file.id
            ORDER BY 
                COUNT(DISTINCT usr.id) DESC
            LIMIT 2
        )
        SELECT  
            file.id AS fileId,
            file.name AS fileName,
            file.risk AS fileRisk,
            usr.name AS userName
        FROM 
            files file
        INNER JOIN file_groups file_group ON file_group.file_id = file.id
        INNER JOIN groups grp ON grp.id = file_group.group_id
        INNER JOIN group_users user_group ON user_group.group_id = grp.id
        INNER JOIN users usr ON usr.id = user_group.user_id
        WHERE 
            file.id IN (SELECT file_id FROM topFileIds)
            
     * 
     */
    async getTopSharedFiles(k: number): Promise<ResponseTopShared[]> {
        const result = await this.repository
            .createQueryBuilder("file")
            .innerJoinAndSelect("file.groups", "group")
            .innerJoinAndSelect("group.users", "user")
            .select([
                "file.id",
                "file.name",
                "file.risk",
                "COUNT(DISTINCT user.id) as userCount"
            ])
            .groupBy("file.id")
            .orderBy("userCount", "DESC")
            .limit(k)
            .getRawMany();

        const fileIds = result.map(row => row.file_id);

        const filesWithUsers = await this.repository
            .createQueryBuilder("file")
            .innerJoinAndSelect("file.groups", "group")
            .innerJoinAndSelect("group.users", "user")
            .where("file.id IN (:...fileIds)", { fileIds })
            .select([
                "file.id as id",
                "file.name as filename",
                "file.risk as risk",
                "user.name as name"
            ])
            .getRawMany();

        const fileMap: ResponseTopShared[] = []

        filesWithUsers.forEach(row => {
            // Find the file object in the files array
            let file = fileMap.find(f => f.name === row.filename);

            if (!file) {
                file = {
                    name: row.filename,
                    risk: row.risk,
                    users: []
                };

                fileMap.push(file);
            }

            // Add the user to the users array
            file.users.push(row.name);
        });

        return Array.from(fileMap.values()).map(file => ({
            ...file,
            users: Array.from(file.users)
        }));
    }

}