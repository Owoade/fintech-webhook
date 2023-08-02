import Joi from "joi";

export const create_account_validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    business_name: Joi.string().required()
}).required()

export const login_validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).required()
