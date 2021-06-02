const jwt = require('jsonwebtoken');
const logger = require('../app/common/logger');
module.exports = function authenticateToken(req, res, next, requiredAccess) {
    if (!req.user || req.user.access !== requiredAccess) {
        return res.sendStatus(403);
    }
    next();
}
