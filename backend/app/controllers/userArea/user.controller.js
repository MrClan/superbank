const db = require("../../models");
const argon2 = require("argon2");
const _ = require("lodash");
const User = db.users;

module.exports.create = async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await argon2.hash(req.body.password),
        isActive: true,
        isAdmin: false
    });

    var condition = { email: { $regex: new RegExp(req.body.email), $options: "i" } };
    const userWithSameEmailExists = await User.exists(condition);

    if (userWithSameEmailExists) {
        res.status(400).send({
            message: "Email already registered."
        });
        return;
    }
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something went wrong while creating user."
            });
        });
};

module.exports.findById = async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).send(user);
};

module.exports.findByEmail = async (email) => {
    var condition = { email: { $regex: new RegExp(email), $options: "i" } };
    return await User.findOne(condition);
};
