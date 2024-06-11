const Joi = require("joi");

module.exports.create = Joi.object({
  subjectName: Joi.string().required().label("Name"),
  description: Joi.string().required().min(6).label("Description"),
  standard: Joi.string().required().label("Standard"),
});

module.exports.update = Joi.object({
  subjectName: Joi.string().label("Name"),
  description: Joi.string().min(6).label("Description"),
  standard: Joi.string().label("Standard"),
  isDeleted: Joi.string().label("Delete"),
});
