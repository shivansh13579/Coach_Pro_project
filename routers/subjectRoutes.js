const Router = require("express");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const subjectController = require("../controllers/subjectController");
const subjectValidationSchema = require("../apiValidationSchemas/subjectValidationSchema");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const subjectRouter = Router();

subjectRouter.post(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateBody(subjectValidationSchema.create),
  subjectController.create
);

subjectRouter.put(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(subjectValidationSchema.update),
  joiSchemaValidation.validateParams(subjectValidationSchema.subjectId),
  subjectController.update
);

subjectRouter.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(subjectValidationSchema.subjectId),
  subjectController.findOne
);

subjectRouter.get(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateQuery(subjectValidationSchema.findAll),
  subjectController.findAll
);

subjectRouter.delete(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(subjectValidationSchema.subjectId),
  subjectController.delete
);

module.exports = subjectRouter;
