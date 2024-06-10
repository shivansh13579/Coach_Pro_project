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
  subjectController.update
);

subjectRouter.get("/:id", coachingAuthentication, subjectController.findOne);

subjectRouter.get("/", coachingAuthentication, subjectController.findAll);

subjectRouter.delete("/:id", coachingAuthentication, subjectController.delete);

module.exports = subjectRouter;
