import { FindOneOptions, FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { ResponseGroupDto } from "../dto/group.dto";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { NotFoundException } from "../errors/notfound.exception";
import { BaseService } from "./base.service";

export class GroupService extends BaseService<Group> {
    constructor() {
        super(AppDataSource.getRepository(Group));
    }

    async get(id: number): Promise<ResponseGroupDto | null> {
        const options: FindOneOptions<Group> = {
            where: { id } as FindOptionsWhere<Group>,
            relations: ["users"],
        };
        const group = await this.repository.findOne(options);

        if (!group) {
            throw new NotFoundException("No Group found");
        }

        return {
            name: group.name,
            users: group.users,
        }
    }

    async addUserToGroup(groupId: number, userId: number): Promise<Group | null> {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["users"]
        });
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

        if (!group) {
            throw new NotFoundException("No group found");
        }
        if (!user) {
            throw new NotFoundException("No user found");
        }

        group.users.push(user);

        return this.repository.save(group);
    }

    async removeUserFromGroup(groupId: number, userId: number): Promise<Group | null> {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["users"]
        });

        if (!group) {
            throw new NotFoundException("No group found");
        }

        group.users = group.users.filter(user => user.id !== userId);
        return this.repository.save(group);
    }

}