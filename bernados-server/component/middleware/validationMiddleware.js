const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('name')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('studentNumber')
        .isNumeric().withMessage('Student number must be a number')
        .isLength({ min: 8, max: 8 }).withMessage('Student number must be exactly 8 digits long'),
    body('course')
        .isString().withMessage('Course must be a string')
        .isLength({ min: 2 }).withMessage('Course must be at least 2 characters long'),
    body('yearLevel')
        .isString().withMessage('Year level must be a string')
        .isLength({ min: 1 }).withMessage('Year level must be at least 1 character long'),
    body('email')
        .isEmail().withMessage('Invalid email address'),
    body('password')    
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const loginValidation = [
    body('email')
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const userValidation = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email address'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .isIn(['Admin', 'Customer']).withMessage('Role must be either Admin or Customer'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { registerValidation, loginValidation, userValidation };