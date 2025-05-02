const Joi = require("joi");

const schemaCreate = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().integer().required(),
    imageUrl: Joi.string().min(11).required(),
    categoryId: Joi.string().required(),
});

const schemaUpdate = Joi.object({
    name: Joi.string().min(3),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number().integer(),
    imageUrl: Joi.string().min(11),
    categoryId: Joi.string(),
});


const validateCreateProduct = (request, response, next) => {
    const { error } = schemaCreate.validate(request.body);

    if (error) {
        return response.status(400).json({ message: error.details[0].message });
    }

    next();
}

const validateUpdateProduct = (request, response, next) => {
    const { error } = schemaUpdate.validate(request.body);

    if (error) {
        return response.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = { validateCreateProduct, validateUpdateProduct };