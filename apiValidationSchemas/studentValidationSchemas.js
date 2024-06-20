const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  description: Joi.string().allow("").label("Description"),
  fatherName: Joi.string().allow("").label("Session"),
  address: Joi.string().allow("").label("Session"),
  mobile: Joi.string().allow("").label("Session"),
  standard: Joi.string().allow("").label("Standard"),
  subject: Joi.string().allow("").label("Subject"),
  batch: Joi.string().allow("").label("Batch"),
  session: Joi.string().allow("").label("Session"),
  pincode: Joi.string().allow("").label("Session"),
  state: Joi.string().allow("").label("Session"),
  city: Joi.string().allow("").label("Session"),
});

module.exports.update = Joi.object({
  firstName: Joi.string().allow("").label("First Name"),
  lastName: Joi.string().allow("").label("Last Name"),
  description: Joi.string().allow("").label("Description"),
  fatherName: Joi.string().allow("").label("Session"),
  address: Joi.string().allow("").label("Session"),
  mobile: Joi.string().allow("").label("Session"),
  standard: Joi.string().allow("").label("Standard"),
  subject: Joi.string().allow("").label("Subject"),
  batch: Joi.string().allow("").label("Batch"),
  session: Joi.string().allow("").label("Session"),
  pincode: Joi.string().allow("").label("Session"),
  state: Joi.string().allow("").label("Session"),
  city: Joi.string().allow("").label("Session"),
  standard: Joi.string().allow("").label("Standard"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.studentId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Student");
    })
    .required(),
});
