module.exports = app => {
    const userManagementModel = require("../../models/adminArea/userManagement.model");
    const userManagementController = require("../../controllers/adminArea/userManagement.controller");
    const authMiddleware = require("../../../middlewares/authMiddleware");
    const accessCheckMiddleware = require("../../../middlewares/accessCheckMiddleware");

    var router = require("express").Router();

    router.get(
        "/",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'admin'),
        async (req, res) => await userManagementController.findAll(req, res));

    router.post(
        "/",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'admin'),
        userManagementModel.validator.validateUserCreation,
        async (req, res) => await userManagementController.create(req, res));

    router.patch(
        "/:id",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'admin'),
        userManagementModel.validator.validateUserUpdate,
        async (req, res) => userManagementController.update(req, res));

    router.delete(
        "/:id",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'admin'),
        async (req, res) => userManagementController.delete(req, res));

    app.use('/api/admin/usermanagement', router);
};