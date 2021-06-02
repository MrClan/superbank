const db = require("../../models");
const shortId = require("shortid");
const argon2 = require("argon2");
const _ = require("lodash");
const User = db.users;


function generateAccountNo() {
    const seed = shortId.generate();
    let retVal = "";
    _.each(seed, (c) => {
        retVal += c.charCodeAt(0).toString();
    });
    return retVal;
}
exports.create = async (req, res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
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

exports.findAll = async (req, res) => {
    const users = await User.find({});
    res.send(users);
};
exports.findAllActive = (req, res) => { };
exports.findById = (req, res) => { };
exports.findByEmail = async (email) => {
    var condition = { email: { $regex: new RegExp(email), $options: "i" } };
    return await User.findOne(condition);
};
exports.update = (req, res) => { };
exports.delete = (req, res) => { };