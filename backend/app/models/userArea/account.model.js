const Joi = require("joi");
const requestValidator = require("../../../middlewares/requestValidator");

module.exports.model = mongoose => {
    var schema = mongoose.Schema(
        {
            userId: String,
            accountNo: String,
            bankName: String,
            balance: Number,
            isActive: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("account", schema);
};

module.exports.validator = {
    validateAccountCreation: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            token: Joi.required(),
            bankName: Joi.required(),
            accountNo: Joi.string().max(12).min(12).required()
        }));
    },

    validateAccountPatch: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            isActive: Joi.bool().required()
        }));
    },

    validateAccountDelete: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
        }));
    }
}