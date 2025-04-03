const { body } = require('express-validator');

exports.validateSignup = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('roleId').isInt().withMessage('Valid role ID is required')
];

exports.validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

exports.validateTicket = [
    body('clientName').trim().isLength({ max: 30 }).notEmpty()
        .withMessage('Client name is required and must be max 30 characters'),
    body('clientAddress').trim().isLength({ max: 100 }).notEmpty()
        .withMessage('Client address is required and must be max 100 characters'),
    body('email').trim().isLength({ max: 30 }).isEmail()
        .withMessage('Please enter a valid email (max 30 characters)'),
    body('phoneNumber').isInt()
        .withMessage('Phone number must be numeric'),
    body('amount').isInt({ min: 0 })
        .withMessage('Amount must be a positive integer')
];