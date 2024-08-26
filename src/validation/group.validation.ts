import { body } from 'express-validator';

export const createGroupValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('users').optional().isArray().withMessage('Users must be an array'),
    body('users.*').isInt().withMessage('User IDs must be integers')
];

export const updateGroupValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('users').optional().isArray().withMessage('Users must be an array'),
    body('users.*').isInt().withMessage('User IDs must be integers')
];