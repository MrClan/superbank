const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const winston = require('winston');
const logger = require('./app/common/logger');
const expressWinston = require('express-winston');
const migration = require("./app/migrations/addDefaultAdmin");

dotenv.config();


const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

const publicPath = __dirname + "/public";
app.use(express.static(publicPath));

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/healthcheck", (req, res) => {
    res.json({ message: "Api up." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/userArea/user.routes")(app);
require("./app/routes/userArea/transaction.routes")(app);
require("./app/routes/userArea/account.routes")(app);
require("./app/routes/adminArea/userManagement.routes")(app);

if (process.env.MODE !== "test") {
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path.join(__dirname, 'SuperBank_Winston.log') })
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: false,
        msg: "HTTP  ",
        expressFormat: true,
        colorize: false,
        ignoreRoute: function (req, res) { return false; }
    }));

    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'SuperBank.log'), { flags: 'a' })
    morgan.token('body', (req, res) => JSON.stringify(req.body));
    app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', accessLogStream));
}


app.use((err, req, res, next) => {
    logger.error(`Error occurred.${err}`)
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
});

logger.log(`initializing server app... Mode=${process.env.MODE}`);

const superBankServer = http.createServer(app);
app.on('dbUp', () => {
    // set port, listen for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        logger.log(`Server is running on port ${PORT}.`);
        app.emit('serverUp');
    });
});

const db = require("./app/models");
db.mongoose
    .connect(
        process.env.MODE == "test" ?
            db.connectionStrings.test :
            db.connectionStrings.default, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        logger.log("Connected to the database!");
        migration.createDefaultAdmin();
        app.emit('dbUp');
    })
    .catch(err => {
        logger.log("Cannot connect to the database!", err);
        process.exit();
    });


module.exports = { superBankServer, app }