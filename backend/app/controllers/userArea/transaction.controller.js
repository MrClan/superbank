const db = require("../../models");
const Transaction = db.transactions;
module.exports.getAll = async (req, res) => {
    res.status(200).send(await Transaction.find({
        $query: { userId: req.user.id },
        $orderby: { completedOn: -1 }
    }));
}