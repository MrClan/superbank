const db = require("../../models");
const moment = require("moment");
const Transaction = db.transactions;
const Account = db.accounts;
const logger = require("../../common/logger");
const mongoose = require("mongoose");

module.exports.deposit = async (req, res) => {
    const transaction = new Transaction({
        userId: req.user.id,
        srcAccountNo: '',
        targetAccountNo: req.body.targetAccountNo,
        type: 'deposit',
        amount: req.body.amount,
        postTransactionBalance: 0,
        comment: req.body.comment,
        completedOn: moment().utc()
    });

    // check if account active
    const account = await Account.findOne({ accountNo: req.body.targetAccountNo });
    if (!account) {
        return res.status(404).send("Account does not exist");
    }

    if (account.userId !== req.user.id) {
        logger.warn("Unauthorized attempt to deposit");
        return res.status(403).send("Unauthorized");
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        account.balance = account.balance + req.body.amount;
        transaction.postTransactionBalance = account.balance;

        account.save();
        transaction.save();
    });

    session.endSession();

    return res.status(201).send(transaction);
};