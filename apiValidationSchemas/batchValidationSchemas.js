const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  batchName: Joi.string().required().label("Batch Name"),
  description: Joi.string().allow("").label("Description"),
  batchStartDate: Joi.string().allow("").label("Batch Start Date"),
  batchEndingDate: Joi.string().allow("").label("Batch Ending Date"),
  batchStartTime: Joi.string().allow("").label("Batch Start Time"),
  batchEndingTime: Joi.string().allow("").label("Batch Ending Time"),
  studentLimit: Joi.string().allow("").label("student Limit"),
  batchFee: Joi.string().allow("").label("Batch Fee"),
  standard: Joi.string().allow("").label("Standard"),
  subject: Joi.string().allow("").label("Subject"),
});

module.exports.update = Joi.object({
  batchName: Joi.string().allow("").label("Batch Name"),
  description: Joi.string().allow("").label("Description"),
  batchStartDate: Joi.string().allow("").label("Batch Start Date"),
  batchEndingDate: Joi.string().allow("").label("Batch Ending Date"),
  batchStartTime: Joi.string().allow("").label("Batch Start Time"),
  batchEndingTime: Joi.string().allow("").label("Batch Ending Time"),
  studentLimit: Joi.string().allow("").label("student Limit"),
  batchFee: Joi.string().allow("").label("Batch Fee"),
  standard: Joi.string().allow("").label("Standard"),
  subject: Joi.string().allow("").label("Subject"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.batchId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Batch");
    })
    .required(),
});
