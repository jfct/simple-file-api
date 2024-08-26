import { Router } from "express";
import GroupController from "../controller/group.controller";
import { createGroupValidation, updateGroupValidation } from "../validation/group.validation";
import { idValidation, validateEntitySharingIds } from "../validation/validation";

const groupRouter = Router();
const controller = new GroupController();

// Group routes
groupRouter.get('/:id', idValidation, controller.get.bind(controller));

groupRouter.post('/', createGroupValidation, controller.create.bind(controller));
groupRouter.post('/:id/user/:entityId', validateEntitySharingIds, controller.addUserToGroup.bind(controller));

groupRouter.put('/:id', idValidation, updateGroupValidation, controller.update.bind(controller));

groupRouter.delete('/:id', idValidation, controller.delete.bind(controller));
groupRouter.delete('/:id/user/:entityId', validateEntitySharingIds, controller.removeUserFromGroup.bind(controller));


export default groupRouter;