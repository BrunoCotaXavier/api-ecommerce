const Joi = require("joi");

const schemaCreate = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cpf: Joi.string().min(11).required(),
});

const schemaUpdate = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    cpf: Joi.string().min(11)
});

const validateCreateUser = (request, response, next) => {
    const { error } = schemaCreate.validate(request.body);

    if (error) {
        return response.status(400).json({ message: error.details[0].message });
    }

    next();
}

const validateUpdateUser = (request, response, next) => {
    const { error } = schemaUpdate.validate(request.body);

    if (error) {
        return response.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = { validateCreateUser, validateUpdateUser };