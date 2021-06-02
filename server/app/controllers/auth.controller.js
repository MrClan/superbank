const db = require("../models");
const Auth = db.auths;
const moment = require("moment");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userArea/user.controller");
const argon2 = require("argon2");


function generateAccessToken(tokenData) {
    return jwt.sign(
        tokenData,
        process.env.TOKEN_SALT,
        {
            expiresIn: `${process.env.TOKEN_EXPIRATION_TIME_IN_SECONDS}s`
        });
}

async function saveAuthEntry(authEntry) {
    try {
        const id = await authEntry.save(authEntry);
    } catch (err) {
        throw err;
    }
}

exports.create = async (req, res) => {
    // prevent multiple login  attempts after 5 failed attempts
    const limitDate = moment.utc().subtract(5, 'minutes');
    var condition = { lastAttemptOn: { $gte: limitDate }, email: req.body.email };
    const attemptsInLast5mins = await Auth.countDocuments(condition);

    if (attemptsInLast5mins > 5) {
        res.status(403).send({
            message: "Too many login attempts in too short time."
        });
        return;
    }

    // verify user
    const user = await userController.findByEmail(req.body.email);
    if (!user) {
        return res.status(401).send("Unauthorized");
    }

    try {
        if (await argon2.verify(user.password, req.body.password)) {

            const newToken = generateAccessToken({
                id: user._id.toString(),
                access: user.isAdmin ? 'admin' : 'user'
            });

            await saveAuthEntry(new Auth({
                email: req.body.email,
                lastAttemptOn: moment.utc().toISOString(true),
                authResult: true,
                token: newToken
            }));
            return res.status(200).send({ token: newToken });
        } else {

            await saveAuthEntry(new Auth({
                email: req.body.email,
                lastAttemptOn: moment.utc().toISOString(true),
                authResult: false,
                token: newToken
            }));
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};