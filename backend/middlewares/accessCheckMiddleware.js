module.exports = function authenticateToken(req, res, next, requiredAccess) {
    if (!req.user || requiredAccess.indexOf(req.user.access) == -1) {
        return res.sendStatus(403);
    }
    next();
}
