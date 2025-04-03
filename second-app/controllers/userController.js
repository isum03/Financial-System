const db = require('../Config/db');

exports.getUsers = async (req, res) => {
    try {
        const [users] = await db.execute(
            `SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, 
             r.role_name FROM users u
             JOIN roles r ON u.role_id = r.role_id
             WHERE u.is_active = 1`
        );
        res.json(users);
    } catch (error) {
        console.error("Get Users Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [users] = await db.execute(
            `SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, 
             u.phone, r.role_name 
             FROM users u
             JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = ? AND u.is_active = 1`,
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        
        // Check if user has permission to update
        if (req.user.user_id !== parseInt(req.params.id) && req.user.role_name !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        
        await db.execute(
            `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?
             WHERE user_id = ?`,
            [firstName, lastName, email, phone, req.params.id]
        );

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // Soft delete - just mark as inactive
        await db.execute(
            'UPDATE users SET is_active = 0 WHERE user_id = ?',
            [req.params.id]
        );

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};