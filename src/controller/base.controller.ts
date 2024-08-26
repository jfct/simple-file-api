// src/controllers/BaseController.ts

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export abstract class BaseController {
    protected abstract service: any;

    async create(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const item = await this.service.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            next(error)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const { id } = req.params;
            const item = await this.service.findById(parseInt(id));

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json(item);
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const { id } = req.params;
            const updatedItem = await this.service.update(parseInt(id), req.body);

            if (!updatedItem) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.json(updatedItem);
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 'error', error: errors.array() });
        }

        try {
            const { id } = req.params;
            const deleted = await this.service.delete(parseInt(id));

            if (!deleted) {
                return res.status(404).json({ error: 'Item not found' });
            }

            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}