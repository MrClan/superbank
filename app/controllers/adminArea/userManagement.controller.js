const db = require("../../models");
const argon2 = require("argon2");
const _ = require("lodash");
const User = db.users;

exports.create = async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await argon2.hash(req.body.password),
        isActive: true
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


exports.update = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send("User does not exist");
    }

    if (user.isAdmin) {
        return res.status(403).send("Admin user cannot be updated");
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.isActive = req.body.isActive;

    await user.save();
    return res.sendStatus(204);
};


exports.delete = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).send("User does not exist");
    }

    if (user.isAdmin) {
        return res.status(403).send("Admin user cannot be deleted");
    }

    await user.deleteOne();
    return res.sendStatus(204);
};

exports.findAll = async (req, res) => res.status(200).send(await User.find({}));