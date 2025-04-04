const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { 
    getRoles, 
    createRole, 
    updateRole, 
    deleteRole 
} = require('../controllers/roleController');

//get all routes
router.get('/', auth, getRoles);
//create new user roles
router.post('/', auth, roleCheck(['admin']), createRole);
router.put('/:id', auth, roleCheck(['admin']), updateRole);
router.delete('/:id', auth, roleCheck(['admin']), deleteRole);

module.exports = router;