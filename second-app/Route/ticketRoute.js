const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { validateTicket, validateTicketAssignment  } = require('../middleware/validate');
const { 
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    assignTicket 
} = require('../controllers/ticketController');

// Create ticket (only financial planners)
router.post('/', 
    auth, 
    roleCheck(['planner']), 
    validateTicket, 
    createTicket
);

// Get all tickets
router.get('/', auth, getTickets);

// Get specific ticket
router.get('/:id', auth, getTicketById);

// Assign ticket (only financial planners can assign)
router.post('/:ticketId/assign',
    auth,
    roleCheck(['planner']),
    validateTicketAssignment,
    assignTicket
);

// Update ticket (both roles can update)
router.put('/:id', 
    auth, 
    roleCheck(['planner', 'broker']), 
    validateTicket, 
    updateTicket
);

// Delete ticket (admin only)
router.delete('/:id', 
    auth, 
    roleCheck(['admin']), 
    deleteTicket
);

module.exports = router;