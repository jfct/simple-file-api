import { UserService } from "../service/user.service";
import { BaseController } from "./base.controller";


class UserController extends BaseController {
    protected service: UserService = new UserService();
}

export default UserController;