import Joi from "joi";

export const create_transaction_validator = Joi.object({
    amount: Joi.number().required(),
    type: Joi.string().valid("credit", "debit").required(),
    merchant_id: Joi.number().required()

}).required()