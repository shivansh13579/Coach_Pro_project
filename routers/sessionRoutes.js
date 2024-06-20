const Router = require("express");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const sessionController = require("../controllers/sessionController");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const sessionValidationSchema = require("../apiValidationSchemas/sessionValidationSchemas");
const sessionRoute = Router();

sessionRoute.post(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateBody(sessionValidationSchema.create),
  sessionController.create
);

sessionRoute.put(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(sessionValidationSchema.update),
  joiSchemaValidation.validateParams(sessionValidationSchema.sessionId),
  sessionController.update
);

sessionRoute.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(sessionValidationSchema.sessionId),
  sessionController.findOne
);

sessionRoute.get(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateQuery(sessionValidationSchema.findAll),
  sessionController.findAll
);

sessionRoute.delete(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(sessionValidationSchema.sessionId),
  sessionController.delete
);

module.exports = sessionRoute;
