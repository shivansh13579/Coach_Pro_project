const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  sessionName: Joi.string().allow("").label("Session Name"),
  sessionStart: Joi.string().allow("").label("Session Start"),
  sessionEnd: Joi.string().allow("").label("Session End"),
  aboutSession: Joi.string().allow("").label("About Session"),
  standard: Joi.string().allow("").label("Standard"),
  subject: Joi.string().allow("").label("Subject"),
  batch: Joi.string().allow("").label("Batch"),
});

module.exports.update = Joi.object({
  sessionName: Joi.string().allow("").label("Session Name"),
  sessionStart: Joi.string().allow("").label("Session Start"),
  sessionEnd: Joi.string().allow("").label("Session End"),
  aboutSession: Joi.string().allow("").label("About Session"),
  standard: Joi.string().allow("").label("Standard"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.sessionId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Session");
    })
    .required(),
});
