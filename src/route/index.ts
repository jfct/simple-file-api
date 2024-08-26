import { Router } from "express";
import fileRouter from "./file.route";
import groupRouter from "./group.route";
import userRouter from "./user.route";

const apiRouter = Router();

apiRouter.use('/file', fileRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/group', groupRouter);

export default apiRouter;