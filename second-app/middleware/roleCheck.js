const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        console.log("User role:", req.user.role_name);
        console.log("Allowed roles:", allowedRoles);
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = roleCheck;