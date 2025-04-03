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

router.get('/', auth, getRoles);
router.post('/', auth, roleCheck(['admin']), createRole);
router.put('/:id', auth, roleCheck(['admin']), updateRole);
router.delete('/:id', auth, roleCheck(['admin']), deleteRole);

module.exports = router;