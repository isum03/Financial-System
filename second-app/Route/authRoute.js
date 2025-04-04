const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validate');

//handle user configuration with validation
router.post('/signup', validateSignup, signup);

//handle user registration validation
router.post('/login', validateLogin, login);

module.exports = router;