const Router = require("express");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const studentController = require("../controllers/studentController");
const studentValidationSchema = require("../apiValidationSchemas/studentValidationSchemas");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const studentRouter = Router();

studentRouter.post(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateBody(studentValidationSchema.create),
  studentController.create
);

studentRouter.put(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(studentValidationSchema.update),
  joiSchemaValidation.validateParams(studentValidationSchema.studentId),
  studentController.update
);

studentRouter.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(studentValidationSchema.studentId),
  studentController.findOne
);

studentRouter.get(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateQuery(studentValidationSchema.findAll),
  studentController.findAll
);

studentRouter.delete(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(studentValidationSchema.studentId),
  studentController.delete
);

module.exports = studentRouter;
