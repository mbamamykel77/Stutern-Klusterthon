import Joi from "joi";

export const produceValidator = Joi.object({
  produceName: Joi.string().trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  quantity: Joi.number().integer().min(0).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 0",
    "any.required": "Quantity is required",
  })
  // price: Joi.number().min(0).required().messages({
  //   "number.base": "Price must be a number",
  //   "number.min": "Price must be at least 0",
  //   "any.required": "Price is required",
  // }),
}).strict();
