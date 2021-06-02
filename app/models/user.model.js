const Joi = require("joi");
const requestValidator = require("../../middlewares/requestValidator");

module.exports.model = mongoose => {
    var schema = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            email: String,
            password: String,
            isActive: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, password, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("user", schema);
};

module.exports.validator = {
    validateUserCreation: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            firstName: Joi.string().max(24).required(),
            lastName: Joi.string().max(24).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).required(),
        }));
    },
    validateUserUpdate: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            id: Joi.string().required(),
            firstName: Joi.string().max(24).required(),
            lastName: Joi.string().max(24).required(),
        }));
    },
    validateUserDelete: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            id: Joi.string().required()
        }));
    },

}