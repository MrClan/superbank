const authMiddleware = require("../../middlewares/authMiddleware.js");
const accessCheckMiddleware = require("../../middlewares/accessCheckMiddleware");

module.exports = app => {
    const transferController = require("../controllers/userArea/transfer.controller.js");
    const depositController = require("../controllers/userArea/deposit.controller.js");
    const withdrawController = require("../controllers/userArea/withdraw.controller.js");
    const model = require("../models/transaction.model");

    var router = require("express").Router();

    router.post(
        "/deposit",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateDepositTransaction,
        async (req, res) => await depositController.deposit(req, res));

    router.post(
        "/withdraw",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateWithdrawalTransaction,
        async (req, res) => await withdrawController.withdraw(req, res));

    router.post(
        "/transfer",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        model.validator.validateTransferTransaction,
        async (req, res) => await transferController.transfer(req, res));

    app.use('/api/transactions', router);
};