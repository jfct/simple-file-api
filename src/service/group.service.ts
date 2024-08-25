import { AppDataSource } from "../data-source";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { BaseService } from "./base.service";

export class GroupService extends BaseService<Group> {
    constructor() {
        super(AppDataSource.getRepository(Group));
    }

    async addUserToGroup(groupId: number, userId: number): Promise<Group | null> {
        const group = await this.repository.findOne({
            where: { id: groupId },
            relations: ["users"]
        });
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });

        if (!group || !user) {
            return null;
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
            return null;
        }

        group.users = group.users.filter(user => user.id !== userId);
        return this.repository.save(group);
    }

}