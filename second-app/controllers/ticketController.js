const db = require('../Config/db');
const { validationResult } = require('express-validator');

const generateSerialNumber = () => {
    const date = new Date();
    return `TKT-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

exports.createTicket = async (req, res) => {
    try {
        console.log('--- Create Ticket Request ---');
        console.log('User:', req.user);
        console.log('Request Body:', req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { clientName, clientAddress, email, phoneNumber, amount } = req.body;
        const serialNo = generateSerialNumber();
        console.log('Generated Serial Number:', serialNo);

        // Log the SQL query and parameters
        const query = `INSERT INTO ticket (serial_no, client_name, client_address, email, phone_number, 
            amount, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [serialNo, clientName, clientAddress, email, phoneNumber, amount, req.user.user_id];
        
        console.log('SQL Query:', query);
        console.log('Parameters:', params);

        const [result] = await db.execute(query, params);
        console.log('Database Result:', result);

        res.status(201).json({
            message: "Ticket created successfully",
            ticketId: serialNo
        });

    } catch (error) {
        console.error("Create Ticket Error:", error);
        console.error("SQL State:", error.sqlState);
        console.error("SQL Message:", error.sqlMessage);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getTickets = async (req, res) => {
    try {
        let query = `
            SELECT t.*, 
                   c.username as creator_name,
                   c.email as creator_email,
                   a.username as assignee_name,
                   a.email as assignee_email,
                   r.role_name as creator_role
            FROM ticket t
            LEFT JOIN users c ON t.created_by = c.user_id
            LEFT JOIN users a ON t.assigned_to = a.user_id
            LEFT JOIN roles r ON c.role_id = r.role_id
        `;
        
        let params = [];
        if (req.user.role_name !== 'admin') {
            query += ` WHERE t.created_by = ? OR t.assigned_to = ?`;
            params = [req.user.user_id, req.user.user_id];
        }

        const [tickets] = await db.execute(query, params);
        res.json(tickets);

    } catch (error) {
        console.error("Get Tickets Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const [tickets] = await db.execute(
            `SELECT t.*, 
                    c.username as creator_name,
                    a.username as assignee_name
             FROM ticket t
             LEFT JOIN users c ON t.created_by = c.user_id
             LEFT JOIN users a ON t.assigned_to = a.user_id
             WHERE t.serial_no = ?`,
            [req.params.id]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Check if user has access to this ticket
        if (req.user.role_name !== 'admin' && 
            tickets[0].created_by !== req.user.user_id && 
            tickets[0].assigned_to !== req.user.user_id) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(tickets[0]);

    } catch (error) {
        console.error("Get Ticket Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// ...existing code...

exports.updateTicket = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { clientName, clientAddress, email, phoneNumber, amount } = req.body;
        const ticketId = req.params.id;

        // Check if ticket exists and user has permission
        const [tickets] = await db.execute(
            'SELECT * FROM ticket WHERE serial_no = ?',
            [ticketId]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Only creator can update their tickets
        if (tickets[0].created_by !== req.user.user_id) {
            return res.status(403).json({ message: "Access denied" });
        }

        await db.execute(
            `UPDATE ticket 
             SET client_name = ?, client_address = ?, email = ?, 
                 phone_number = ?, amount = ?
             WHERE serial_no = ?`,
            [clientName, clientAddress, email, phoneNumber, amount, ticketId]
        );

        res.json({ message: "Ticket updated successfully" });

    } catch (error) {
        console.error("Update Ticket Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;

        const [result] = await db.execute(
            'DELETE FROM ticket WHERE serial_no = ?',
            [ticketId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.json({ message: "Ticket deleted successfully" });

    } catch (error) {
        console.error("Delete Ticket Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.assignTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { assignedTo } = req.body;

        // First check if ticket exists
        const [tickets] = await db.execute(
            'SELECT * FROM ticket WHERE serial_no = ?',
            [ticketId]
        );

        if (tickets.length === 0) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Check if the assignee exists and is a broker
        const [brokers] = await db.execute(
            `SELECT u.user_id, u.username, r.role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.role_id 
             WHERE u.user_id = ? AND r.role_name = 'broker' AND u.is_active = 1`,
            [assignedTo]
        );

        if (brokers.length === 0) {
            return res.status(400).json({ 
                message: "Invalid assignee - User must be an active broker",
                details: "Please select a valid broker to assign this ticket"
            });
        }

        // Update ticket assignment
        await db.execute(
            `UPDATE ticket 
             SET assigned_to = ?,
                 status = 'assigned',
                 assigned_at = CURRENT_TIMESTAMP
             WHERE serial_no = ?`,
            [assignedTo, ticketId]
        );

        // Get assignee details for response
        const assignee = brokers[0];

        res.json({ 
            message: "Ticket assigned successfully",
            assignee: {
                id: assignee.user_id,
                username: assignee.username,
                role: assignee.role_name
            }
        });

    } catch (error) {
        console.error("Assign Ticket Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};