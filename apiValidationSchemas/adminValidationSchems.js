const Joi = require("joi");

module.exports.registerAdminSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.loginAdminSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.updateAdminSchema = Joi.object({
  firstName: Joi.string().label("First Name"),
  lastName: Joi.string().label("Last Name"),
  email: Joi.string().email().label("Email"),
  password: Joi.string().min(6).label("Password"),
});

module.exports.forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

module.exports.verifyForgotPasswordOtp = Joi.object({
  otp: Joi.string().min(4).label("Otp"),
});

module.exports.updatePassword = Joi.object({
  password: Joi.string().required().min(6).label("Password"),
  conformPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Conformed Password"),
});
