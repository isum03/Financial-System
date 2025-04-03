const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateTicket } = require('../middleware/validate');
const { 
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket 
} = require('../controllers/ticketController');
//router.post('/', auth, roleCheck(['financial_planner', 'mortgage_broker']), validateTicket, createTicket);
//router.post('/', auth, roleCheck(['financial_planner', 'mortgage_broker']), validateTicket, createTicket);
router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/:id', auth, getTicketById);
router.put('/:id', auth, roleCheck(['financial_planner', 'mortgage_broker']), validateTicket, updateTicket);
router.delete('/:id', auth, roleCheck(['admin']), deleteTicket);

module.exports = router;