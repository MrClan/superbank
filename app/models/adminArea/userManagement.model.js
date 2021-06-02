const Joi = require("joi");
const requestValidator = require("../../../middlewares/requestValidator");

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
            firstName: Joi.string().max(24).required(),
            lastName: Joi.string().max(24).required(),
            isActive: Joi.bool().required()
        }));
    },
}