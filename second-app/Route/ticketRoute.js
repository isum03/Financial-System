const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { 
    validateTicket, 
    validateTicketAssignment,
    validateTicketResponse  // Add this import
} = require('../middleware/validate');
const { 
    createTicket,
    getTickets,
    getBrokerTickets  // Add this import
} = require('../controllers/ticketController');

// Create ticket (both planners and brokers)
router.post('/', 
    auth, 
    roleCheck(['planner', 'broker']),
    validateTicket, 
    createTicket
);



router.get('/broker-tickets', 
    auth,
    roleCheck(['broker']),
    getBrokerTickets  // New controller method to be added
);







module.exports = router;