const Router = require("express");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const standardcontroller = require("../controllers/standardController");
const standardValidationSchema = require("../apiValidationSchemas/standardValidationSchema");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const standardRouter = Router();

standardRouter.post(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateBody(standardValidationSchema.create),
  standardcontroller.create
);

standardRouter.put(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(standardValidationSchema.update),
  joiSchemaValidation.validateParams(standardValidationSchema.standardId),
  standardcontroller.update
);

standardRouter.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(standardValidationSchema.standardId),
  standardcontroller.findOne
);

standardRouter.get(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateQuery(standardValidationSchema.findAll),
  standardcontroller.findAll
);

standardRouter.delete(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(standardValidationSchema.standardId),
  standardcontroller.delete
);

module.exports = standardRouter;
