const db = require("../../models");
const moment = require("moment");
const Transaction = db.transactions;
const Account = db.accounts;
const logger = require("../../common/logger");
const mongoose = require("mongoose");

module.exports.withdraw = async (req, res) => {
    const transaction = new Transaction({
        userId: req.user.id,
        srcAccountNo: req.body.srcAccountNo,
        targetAccountNo: '',
        type: 'withdraw',
        amount: req.body.amount,
        postTransactionBalance: 0,
        comment: req.body.comment,
        completedOn: moment().utc()
    });

    // check if account active
    const account = await Account.findOne({ accountNo: req.body.srcAccountNo });
    if (!account) {
        return res.status(404).send("Account does not exist");
    }

    if (account.userId !== req.user.id) {
        logger.warn("Unauthorized attempt to withdraw");
        return res.status(403).send("Unauthorized");
    }

    if (account.balance < req.body.amount) {
        logger.warn("Insufficient balance");
        return res.status(403).send({ message: "Insufficient balance" });
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
        account.balance = account.balance - req.body.amount;
        transaction.postTransactionBalance = account.balance;

        account.save();
        transaction.save();
    });

    session.endSession();

    return res.status(201).send(transaction);
};