module.exports = app => {
    const model = require("../models/auth.model");
    const controller = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/",
        model.validator.validateAuthLogin,
        async (req, res) => await controller.create(req, res));

    app.use('/api/auth', router);
};