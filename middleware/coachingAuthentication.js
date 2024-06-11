const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const { commanMessage } = require("../constants/message");
const jwt = require("jsonwebtoken");
const Coaching = require("../models/coachingModel");

module.exports = async (req, res, next) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      response.errors.error = commanMessage.TOKEN_MISSING;
      response.message = commanMessage.VALIDATION_FAILED;
      return res.status(response.status).send(response);
    }

    const token = authorization?.replace("Bearer ", "");

    let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const coaching = await Coaching.findById(decodeToken.id);

    if (!coaching) {
      response.message = commanMessage.VALIDATION_FAILED;
      response.errors.error = commanMessage.INVALID_ID;
      res.status(response.status).send(response);
    }

    req.coaching = coaching;
    next();
  } catch (error) {
    response.message = commanMessage.VALIDATION_FAILED;
    response.errors.error = error.message;
    res.status(response.status).send(response);
  }
};
