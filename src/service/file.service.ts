import { AppDataSource } from "../data-source";
import { File } from "../entity/file.entity";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { BaseService } from "./base.service";

export class FileService extends BaseService<File> {
    constructor() {
        super(AppDataSource.getRepository(File));
    }

    async shareFileWithUser(fileId: number, userId: number): Promise<File | null> {
        const file = await this.repository.findOne({
            where: { id: fileId },
            relations: ["users"]
        });
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

        if (!file || !user) {
            return null;
        }

        file.users.push(user);

        return this.repository.save(file);
    }

    async shareFileWithGroup(fileId: number, groupId: number): Promise<File | null> {
        const file = await this.repository.findOne({
            where: { id: fileId },
            relations: ["groups"]
        });
        const group = await AppDataSource.getRepository(Group).findOne({ where: { id: groupId } });

        if (!file || !group) {
            return null;
        }

        file.groups.push(group);

        return this.repository.save(file);
    }

    async getTopSharedFiles(k: number): Promise<File[]> {
        return this.repository
            .createQueryBuilder("file")
            .leftJoinAndSelect("file.users", "users")
            .leftJoinAndSelect("file.groups", "groups")
            .addSelect("COUNT(DISTINCT users.id) + COUNT(DISTINCT groups.id)", "shareCount")
            .groupBy("file.id")
            .orderBy("shareCount", "DESC")
            .limit(k)
            .getMany();
    }

}