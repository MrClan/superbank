module.exports = requestValidator;

function requestValidator(req, res, next, schema) {
    const options = {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.status(400).send({ validationErrors: error.details.map(x => x.message).join(', ') });
        return;
    } else {
        console.log(value);
        req.body = value;
        next();
    }
}