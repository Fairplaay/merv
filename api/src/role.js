const requireRole = role => (req, res, next) => {
    if (req.user && req.role === role) {
        next();
    }
    else {
        res.send(403);
    }
};

export default requireRole;
