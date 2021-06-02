module.exports = app => {
    const user = require("../models/user.model");
    const users = require("../controllers/userArea/user.controller.js");

    var router = require("express").Router();

    router.get("/", async (req, res) => await users.findAll(req, res));
    router.get("/active", users.findAllActive);
    router.get("/:id", users.findById);

    router.post("/", user.validator.validateUserCreation, async (req, res) => await users.create(req, res));
    // router.put("/:id", user.validator.validateUserUpdate, users.update);
    // router.delete("/:id", user.validator.validateUserDelete, users.delete);

    app.use('/api/users', router);
};