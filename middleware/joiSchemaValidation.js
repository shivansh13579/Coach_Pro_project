const { commanMessage } = require("../constants/message");
const serverResponse = require("../constants/serverResponse");
const lodash = require("lodash");

module.exports.validateBody = function (joiSchema) {
  return function (req, res, next) {
    const response = lodash.cloneDeep(serverResponse);

    try {
      const { error } = joiSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = {};
        for (let err of error.details) {
          errors[err.path[0]] = err.message;
        }

        // send response to client
        response.errors = errors;
        response.message = commanMessage.VALIDATION_FAILED;
        return res.status(response.status).send(response);
      }
    } catch (error) {
      response.errors.error = error.message;
      response.message = commanMessage.VALIDATION_FAILED;
      return res.status(response.status).send(response);
    }

    next();
  };
};
