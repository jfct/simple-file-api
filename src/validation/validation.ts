import { param } from "express-validator";

export const idValidation = [
    param('id').isInt().withMessage('Invalid Id (Must be an int)')
]

export const validateEntitySharingIds = [
    ...idValidation,
    param('entityId').isInt().withMessage('Invalid Entity Id (Must be an int)')
]