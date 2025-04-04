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
    body('clientName')
        .trim()
        .isLength({ max: 100 })  // Changed to match varchar(100)
        .notEmpty()
        .withMessage('Client name is required and must be max 100 characters'),
    
    body('clientAddress')
        .trim()
        .notEmpty()
        .withMessage('Client address is required'),
    
    body('email')
        .trim()
        .isLength({ max: 100 })  // Changed to match varchar(100)
        .isEmail()
        .withMessage('Please enter a valid email (max 100 characters)'),
    
    body('phoneNumber')
        .trim()
        .isLength({ max: 20 })   // Changed to match varchar(20)
        .matches(/^[0-9+\-\s()]*$/)  // Allow phone number formatting
        .withMessage('Please enter a valid phone number'),
    
    body('amount')
        .isFloat({ min: 0 })     // Changed to isFloat for decimal(15,2)
        .withMessage('Amount must be a positive number')
];


// ...existing code...

exports.validateTicketAssignment = [
    body('assignedTo')
        .isInt()
        .notEmpty()
        .withMessage('Valid assignee ID is required'),
    
    body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed', 'cancelled'])
        .withMessage('Invalid status value'),
        
    body('notes')
        .optional()
        .trim()
        .isString()
        .withMessage('Notes must be text')
];