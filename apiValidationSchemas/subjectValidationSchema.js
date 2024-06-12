const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  subjectName: Joi.string().required().label("Subject Name"),
  description: Joi.string().allow("").label("Description"),
  standard: Joi.string().allow("").label("Standard"),
});

module.exports.update = Joi.object({
  subjectName: Joi.string().allow("").label("Subject Name"),
  description: Joi.string().allow("").label("Description"),
  standard: Joi.string().allow("").label("Standard"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.subjectId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Subject");
    })
    .required(),
});
