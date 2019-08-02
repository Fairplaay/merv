import Joi from '@hapi/joi';

export const signupValidation = (data) => {
    const schema = {
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().min(2).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
};

export const loginValidation = (data) => {
    const schema = {
        email: Joi.string().min(2).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
};
