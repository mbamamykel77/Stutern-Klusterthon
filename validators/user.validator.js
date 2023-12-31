// validator here
import Joi from "joi"

export const signupValidator = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'FirstName is required',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'LastName is required',
  }),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
    password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain only letters and numbers, and be at least 6 characters long",
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
    farmName: Joi.string().optional(),
}).strict()


// login validator
export const signinValidator = Joi.object({
  email: Joi.string()
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  .required()
  .messages({
    "string.pattern.base": "Email is not a valid email address",
  }),
password: Joi.string().required(),
}).strict();