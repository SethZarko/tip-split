import { body } from 'express-validator';

export const adminCreateValidation = [
    body("*").notEmpty().withMessage('All Fields Required'),
    body("email").notEmpty().trim().isEmail().normalizeEmail().escape(),
    body("password")
        .trim()
        .isLength({ min: 8, max: 12 })
        .withMessage('Password must be at least 8 characters long and no more than 12 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one digit')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*()_+]/)
        .withMessage('Password must contain at least one special character')
        .escape()
]


export const loginValidation = [
    body("*").notEmpty().withMessage('All Fields Required'),
    body("email").notEmpty().trim().isEmail().normalizeEmail().escape(),
    body("password")
        .trim()
        .escape()
]

export const calcValidation = [
    body("bill")
        .notEmpty()
        .trim()
        .escape(),
    body("tipFormData")
        .notEmpty()
        .trim()
        .escape(),
    body("gratuityFormData")
        .optional()
        .escape(),
    body("HST")
        .optional()
        .escape(),
    body("people")
        .notEmpty()
        .trim()
        .escape(),
    body("finalDisplayTip")
        .notEmpty()
        .trim()
        .escape(),
    body("finalDisplayTotal")
        .notEmpty()
        .trim()
        .escape(),
    body("finalTotalBill")
        .notEmpty()
        .trim()
        .escape(),
]