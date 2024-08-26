import { Router } from 'express';
import FileController from '../controller/file.controller';
import { createFileValidation, topSharedValidation, updateFileValidation } from '../validation/file.validation';
import { idValidation, validateEntitySharingIds } from '../validation/validation';

const fileRouter = Router();
const controller = new FileController();

// File routes
fileRouter.get('/top-shared/:k', topSharedValidation, controller.getTopSharedFiles.bind(controller));
fileRouter.get('/:id', idValidation, controller.get.bind(controller));

fileRouter.post('/', createFileValidation, controller.create.bind(controller));
fileRouter.post('/:id/user/:entityId', validateEntitySharingIds, controller.shareFileWithUser.bind(controller));
fileRouter.post('/:id/group/:entityId', validateEntitySharingIds, controller.shareFileWithGroup.bind(controller));

fileRouter.put('/:id', idValidation, updateFileValidation, controller.update.bind(controller));

fileRouter.delete('/:id', idValidation, controller.delete.bind(controller));

export default fileRouter;