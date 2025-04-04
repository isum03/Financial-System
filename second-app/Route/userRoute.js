const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

//get all routes
router.get('/', auth, roleCheck(['admin']), getUsers);
//get specific user by Id
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, roleCheck(['admin']), deleteUser);

module.exports = router;