const dbConfig = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./userArea/user.model").model(mongoose);
db.transactions = require("./userArea/transaction.model").model(mongoose);
db.accounts = require("./userArea/account.model").model(mongoose);
db.auths = require("./auth.model").model(mongoose);

module.exports = db;