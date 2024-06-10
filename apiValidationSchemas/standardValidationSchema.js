const Joi = require("joi");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().required().min(6).label("Description"),
});

module.exports.update = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().required().min(6).label("Description"),
});

// module.exports.findOne = Joi.object({
//   firstName: Joi.string().label("First Name"),
//   lastName: Joi.string().label("Last Name"),
//   email: Joi.string().email().label("Email"),
//   password: Joi.string().min(6).label("Password"),
// });

// module.exports.findAll = Joi.object({
//   email: Joi.string().email().required().label("Email"),
// });

// module.exports.delete = Joi.object({
//   otp: Joi.string().label("Otp"),
// });

// module.exports.updatePasswordSchema = Joi.object({
//   password: Joi.string().min(3).max(15).required(),
//   confirmPassword: Joi.any()
//     .valid(Joi.ref("password"))
//     .required()
//     .label("Confirm Password"),
// });
