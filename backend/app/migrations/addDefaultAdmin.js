const db = require("../models");
const argon2 = require("argon2");
const logger = require("../common/logger");
const User = db.users;

module.exports.createDefaultAdmin = async () => {
    logger.log('creating default admin user');
    const user = new User({
        firstName: 'admin',
        lastName: 'user',
        email: 'admin@sb.com',
        password: await argon2.hash('1234'),
        isActive: true,
        isAdmin: true
    });
    const userExists = await User.find({ email: 'admin@sb.com' });
    if (!userExists || userExists.length == 0) {
        user
            .save(user)
            .then(data => { logger.log('admin@sb.com created') })
            .catch(err => logger.log(`default admin user creation failed. ${err}`))
    }
}