import { body, param } from "express-validator";


export const createFileValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('risk').isInt({ max: 100, min: 0 }).withMessage('Risk must be integer within (0-100)'),
    body('groups').custom((value) => {
        return Array.isArray(value) && value.every(item => typeof item === 'number');
    })
];

export const updateFileValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('risk').optional().isInt({ max: 100, min: 0 }).withMessage('Risk must be integer within (0-100)'),
    body('groups').optional().custom((value) => {
        return Array.isArray(value) && value.every(item => typeof item === 'number');
    })
];

export const topSharedValidation = [
    param('k').notEmpty().isInt({ min: 1, max: 10 }).withMessage(`Invalid value (Must be numeric between 0-10)`),
]