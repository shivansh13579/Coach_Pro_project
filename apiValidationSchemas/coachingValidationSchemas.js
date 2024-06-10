const Joi = require("joi");

module.exports.loginCoachingSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.registerCoachingSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.updateCoachingSchema = Joi.object({
  firstName: Joi.string().label("First Name"),
  lastName: Joi.string().label("Last Name"),
  email: Joi.string().email().label("Email"),
  password: Joi.string().min(6).label("Password"),
});

module.exports.forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

module.exports.verifyForgotPasswordOtpSchema = Joi.object({
  otp: Joi.string().label("Otp"),
});

module.exports.updatePasswordSchema = Joi.object({
  password: Joi.string().min(3).max(15).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password"),
});
