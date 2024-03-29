module.exports = app => {
    const model = require("../../models/userArea/account.model");
    const controller = require("../../controllers/userArea/account.controller");
    const authMiddleware = require("../../../middlewares/authMiddleware");
    const accessCheckMiddleware = require("../../../middlewares/accessCheckMiddleware");

    var router = require("express").Router();

    router.get("/", authMiddleware, async (req, res) => await controller.findAll(req, res));

    router.post("/",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateAccountCreation,
        async (req, res) => await controller.create(req, res));

    router.patch(
        "/:id",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateAccountPatch,
        controller.changeActiveStatus);

    router.delete(
        "/:id",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateAccountDelete,
        controller.deleteAccount);

    app.use('/api/accounts', router);
};