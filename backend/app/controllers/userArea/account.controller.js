const db = require("../../models");
const Account = db.accounts;
const logger = require("../../common/logger");

module.exports.create = async (req, res) => {
    const account = new Account({
        userId: req.user.id,
        accountNo: req.body.accountNo,
        bankName: req.body.bankName,
        balance: 0,
        isActive: true
    });

    var condition = { accountNo: { $regex: new RegExp(req.body.accountNo), $options: "i" } };
    const accountWithSameNumberExists = await Account.exists(condition);

    if (accountWithSameNumberExists) {
        res.status(400).send({
            message: "Account no already exists."
        });
        return;
    }
    account
        .save(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send({
                message:
                    err.message || "Something went wrong while adding account."
            });
        });
};

module.exports.findAll = async (req, res) => {
    const condition = { userId: req.user.id }
    const accounts = await Account.find(condition);
    res.send(accounts);
};

module.exports.changeActiveStatus = async (req, res) => {
    const account = await Account.findOne({ accountNo: req.params.id });
    if (!account) {
        return res.status(404).send("Account does not exist");
    }

    if (account.userId !== req.user.id) {
        return res.status(403).send("Unauthorized");
    }

    account.isActive = req.body.isActive;
    await account.save();
    return res.sendStatus(204);
};

module.exports.deleteAccount = async (req, res) => {
    const account = await Account.findOne({ accountNo: req.params.id });
    if (!account) {
        return res.status(404).send("Account does not exist");
    }

    if (account.userId !== req.user.id) {
        return res.status(403).send("Unauthorized");
    }

    await account.deleteOne();
    return res.sendStatus(204);
};