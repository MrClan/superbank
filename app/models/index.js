const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js").model(mongoose);
db.transactions = require("./transaction.model.js").model(mongoose);
db.accounts = require("./account.model.js").model(mongoose);
db.auths = require("./auth.model.js").model(mongoose);

module.exports = db;