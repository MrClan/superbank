const Joi = require("joi");
const requestValidator = require("../../middlewares/requestValidator");

module.exports.model = mongoose => {
    var schema = mongoose.Schema(
        {
            email: String,
            lastAttemptOn: Date,
            authResult: Boolean,
            token: String,
            isActive: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("auth", schema);
};

module.exports.validator = {
    validateAuthLogin: function (req, res, next) {
        requestValidator(req, res, next, Joi.object({
            email: Joi.required(),
            password: Joi.required()
        }));
    }
}