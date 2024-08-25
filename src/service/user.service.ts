import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { BaseService } from "./base.service";

export class UserService extends BaseService<User> {
    constructor() {
        super(AppDataSource.getRepository(User));
    }
}