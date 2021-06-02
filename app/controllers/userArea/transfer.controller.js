const db = require("../../models");
const moment = require("moment");
const Transaction = db.transactions;
const Account = db.accounts;
const logger = require("../../common/logger");
const mongoose = require("mongoose");

exports.transfer = async (req, res) => {
    const transaction = new Transaction({
        userId: req.user.id,
        srcAccountNo: req.body.srcAccountNo,
        targetAccountNo: req.body.targetAccountNo,
        type: 'transfer',
        amount: req.body.amount,
        postTransactionBalance: 0,
        comment: req.body.comment,
        completedOn: moment().utc()
    });

    // check if account active
    const accounts = await Account.find({ accountNo: { $in: [req.body.srcAccountNo, req.body.targetAccountNo] } });
    if (!accounts || accounts.length != 2) {
        return res.status(404).send("One or more accounts does not exist");
    }

    let srcAccount = accounts[0];
    let targetAccount = accounts[1];

    if (srcAccount.userId !== req.user.id) {
        logger.warn("Unauthorized attempt to transfer");
        return res.status(403).send("Unauthorized");
    }

    if (srcAccount.balance < req.body.amount) {
        logger.warn("Insufficient balance");
        return res.status(403).send("Insufficient balance");
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        srcAccount.balance = srcAccount.balance - req.body.amount;
        targetAccount.balance = targetAccount.balance + req.body.amount;
        transaction.postTransactionBalance = srcAccount.balance;

        srcAccount.save();
        targetAccount.save();
        transaction.save();
    });

    session.endSession();

    return res.status(201).send(transaction);
};