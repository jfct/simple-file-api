import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { FileService } from '../service/file.service';
import { IdAndEntityParams, RequestWithParams } from '../types/types';
import { BaseController } from './base.controller';

class FileController extends BaseController {
    protected service: FileService = new FileService();

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

    async shareFileWithUser(req: RequestWithParams<IdAndEntityParams>, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const id = req.params.id;
            const userId = req.params.entityId;
            const newFile = await this.service.shareFileWithGroup(id, userId);
            res.json(newFile);
        } catch (error) {
            next(error)
        }
    }

    async shareFileWithGroup(req: RequestWithParams<IdAndEntityParams>, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const id = req.params.id;
            const groupId = req.params.entityId;
            const newFile = await this.service.shareFileWithGroup(id, groupId);
            res.json(newFile);
        } catch (error) {
            next(error)
        }
    }

    async getTopSharedFiles(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const k = parseInt(req.params.k);
            if (k < 1 || k > 10) {
                return res.status(400).json({ error: 'K must be between 1 and 10' });
            }
            const topFiles = await this.service.getTopSharedFiles(k);
            res.json(topFiles);
        } catch (error) {
            next(error)
        }
    }
}

export default FileController;