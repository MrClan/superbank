const jwt = require('jsonwebtoken');
const logger = require('../app/common/logger');
module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    logger.warn(`verifying auth...`);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SALT, (err, user) => {
        logger.error(err);
        if (err) return res.sendStatus(401);
        req.user = user;
        req.body.token = token;
        next();
    });
}
