import { Router } from "express";
import UserController from "../controller/user.controller";
import { createUserValidation, updateUserValidation } from "../validation/user.validation";
import { idValidation } from "../validation/validation";

const userRouter = Router();
const controller = new UserController();

// User routes
userRouter.get('/:id', idValidation, controller.get.bind(controller));

userRouter.post('/', createUserValidation, controller.create.bind(controller));

userRouter.put('/:id', idValidation, updateUserValidation, controller.update.bind(controller));

userRouter.delete('/:id', idValidation, controller.delete.bind(controller));

export default userRouter;