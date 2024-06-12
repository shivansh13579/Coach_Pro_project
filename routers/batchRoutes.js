const Router = require("express");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const batchValidationSchemas = require("../apiValidationSchemas/batchValidationSchemas");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const batchController = require("../controllers/batchController");
const batchRouter = Router();

batchRouter.post(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateBody(batchValidationSchemas.create),
  batchController.create
);

batchRouter.put(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateBody(batchValidationSchemas.update),
  joiSchemaValidation.validateParams(batchValidationSchemas.batchId),
  batchController.update
);

batchRouter.get(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(batchValidationSchemas.batchId),
  batchController.findOne
);

batchRouter.get(
  "/",
  coachingAuthentication,
  joiSchemaValidation.validateQuery(batchValidationSchemas.findAll),
  batchController.findAll
);

batchRouter.delete(
  "/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(batchValidationSchemas.batchId),
  batchController.delete
);

module.exports = batchRouter;
