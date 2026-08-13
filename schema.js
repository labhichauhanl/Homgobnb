import Joi from 'joi';

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
    }).required()
});

const { error, value } = schema.validate({
    username: 'danilo',
    email: 'danilo@example.com',
    age: 28,
});