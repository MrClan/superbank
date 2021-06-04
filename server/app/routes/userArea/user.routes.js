module.exports = app => {
    const user = require("../../models/userArea/user.model");
    const users = require("../../controllers/userArea/user.controller");
    const authMiddleware = require("../../../middlewares/authMiddleware");
    const accessCheckMiddleware = require("../../../middlewares/accessCheckMiddleware");

    var router = require("express").Router();

    router.get(
        "/",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user|admin'),
        async (req, res) => await users.findById(req, res));

    router.post("/", user.validator.validateUserCreation, async (req, res) => await users.create(req, res));

    app.use('/api/users', router);
};