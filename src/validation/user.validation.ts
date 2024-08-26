import { body } from 'express-validator';

export const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
];

export const updateUserValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty')
];

