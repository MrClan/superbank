module.exports = app => {
    const model = require("../models/auth.model");
    const controller = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/",
        model.validator.validateAuthLogin,
        async (req, res) => await controller.create(req, res));

    // router.put("/:id", account.validator.validateaccountUpdate, controller.update);
    // router.delete("/:id", account.validator.validateaccountDelete, controller.delete);

    app.use('/api/auth', router);
};