import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator";
import { GroupService } from "../service/group.service";
import { IdAndEntityParams, RequestWithParams } from '../types/types';
import { BaseController } from "./base.controller";

class GroupController extends BaseController {
    protected service: GroupService = new GroupService();

    // Override so we can use the get instead of findById, since we are going to "work" the data
    async get(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const { id } = req.params;
            const item = await this.service.get(parseInt(id));

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json(item);
        } catch (error) {
            next(error)
        }
    }

    async addUserToGroup(req: RequestWithParams<IdAndEntityParams>, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const id = req.params.id;
            const userId = req.params.entityId;
            const updatedGroup = await this.service.addUserToGroup(id, userId);
            res.json(updatedGroup);
        } catch (error) {
            next(error)
        }
    }

    async removeUserFromGroup(req: RequestWithParams<IdAndEntityParams>, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const id = req.params.id;
            const userId = req.params.entityId;

            const updatedGroup = await this.service.removeUserFromGroup(id, userId);
            res.json(updatedGroup);
        } catch (error) {
            next(error);
        }
    }
}

export default GroupController;