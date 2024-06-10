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
  standardcontroller.update
);

standardRouter.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(standardValidationSchema.findOne),
  standardcontroller.findOne
);

standardRouter.get(
  "/",
  coachingAuthentication,
  //   joiSchemaValidation.validateBody(standardValidationSchema.findAll),
  standardcontroller.findAll
);

standardRouter.delete(
  "/:id",
  coachingAuthentication,
  //   joiSchemaValidation.validateBody(standardValidationSchema.delete),
  standardcontroller.delete
);

module.exports = standardRouter;
