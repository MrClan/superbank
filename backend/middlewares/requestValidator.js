module.exports = requestValidator;

function requestValidator(req, res, next, schema) {
    const options = {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.status(400).send({ message: error.details.map(x => x.message).join(', ') });
        return;
    } else {
        req.body = value;
        next();
    }
}