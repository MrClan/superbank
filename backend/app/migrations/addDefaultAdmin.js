const db = require("../models");
const argon2 = require("argon2");
const User = db.users;

exports.createDefaultAdmin = async () => {
    console.log('creating default admin user');
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
            .then(data => { console.log('admin@sb.com created') })
            .catch(err => console.log(`default admin user creation failed. ${err}`))
    }
}