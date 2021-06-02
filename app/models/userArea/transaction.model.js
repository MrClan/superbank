const moment = require("moment");
const Joi = require("joi");
const requestValidator = require("../../../middlewares/requestValidator");

module.exports.model = mongoose => {
    var schema = mongoose.Schema(
        {
            userId: String,
            srcAccountNo: String,
            targetAccountNo: String,
            type: String,
            amount: Number,
            postTransactionBalance: Number,
            comment: String,
            completedOn: Date
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        object.formattedCompletionDate = moment.utc(object.completedOn).local().format();
        return object;
    });

    return mongoose.model("transaction", schema);
};


module.exports.validator = {
    validateDepositTransaction: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            token: Joi.required(),
            targetAccountNo: Joi.string().max(12).min(12).required(),
            amount: Joi.number().max(100000).min(10).required(),
            comment: Joi.string().max(100)
        }));
    },
    validateWithdrawalTransaction: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            token: Joi.required(),
            srcAccountNo: Joi.string().max(12).min(12).required(),
            amount: Joi.number().max(100000).min(10).required(),
            comment: Joi.string().max(100)
        }));
    },
    validateTransferTransaction: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            token: Joi.required(),
            srcAccountNo: Joi.string().max(12).min(12).required(),
            targetAccountNo: Joi.string().max(12).min(12).required(),
            amount: Joi.number().max(100000).min(10).required(),
            comment: Joi.string().max(100)
        }));
    },
}