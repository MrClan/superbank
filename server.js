const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const winston = require('winston');
const expressWinston = require('express-winston');

dotenv.config();


const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Api up." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/transaction.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/auth.routes")(app);

const elog = expressWinston.logger({
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
});
app.use(elog);
//morgan('tiny');

// setup the logger

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'SuperBank.log'), { flags: 'a' })
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', accessLogStream));
//app.use(morgan('combined', { stream: accessLogStream }))
//app.use(morgan('dev'));

app.use((err, req, res, next) => {
    //log.error('Error occurred.')
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})


const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});