const authMiddleware = require("../../../middlewares/authMiddleware");
const accessCheckMiddleware = require("../../../middlewares/accessCheckMiddleware");

module.exports = app => {
    const transferController = require("../../controllers/userArea/transfer.controller.js");
    const depositController = require("../../controllers/userArea/deposit.controller.js");
    const withdrawController = require("../../controllers/userArea/withdraw.controller.js");
    const transactionController = require("../../controllers/userArea/transaction.controller.js");
    const model = require("../../models/userArea/transaction.model");

    var router = require("express").Router();

    router.get(
        "/",
        authMiddleware,
        async (req, res, next) => accessCheckMiddleware(req, res, next, 'user'),
        async (req, res) => await transactionController.getAll(req, res));

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