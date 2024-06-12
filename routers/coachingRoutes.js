const Router = require("express");
const coachingController = require("../controllers/coachingController");
const coachingAuthentication = require("../middleware/coachingAuthentication");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const coachingValidationSchema = require("../apiValidationSchemas/coachingValidationSchemas");
const coachingRouter = Router();

coachingRouter.post(
  "/register",
  joiSchemaValidation.validateBody(
    coachingValidationSchema.registerCoachingSchema
  ),
  coachingController.registerCoaching
);

coachingRouter.post(
  "/login",
  joiSchemaValidation.validateBody(
    coachingValidationSchema.loginCoachingSchema
  ),
  coachingController.loginCoaching
);

coachingRouter.put(
  "/update/:id",
  coachingAuthentication,
  joiSchemaValidation.validateParams(coachingValidationSchema.coachingId),
  joiSchemaValidation.validateBody(
    coachingValidationSchema.updateCoachingSchema
  ),
  coachingController.updateCoaching
);

coachingRouter.post(
  "/forgotPassword",
  coachingAuthentication,
  joiSchemaValidation.validateBody(
    coachingValidationSchema.forgotPasswordSchema
  ),
  coachingController.forgotPassword
);

coachingRouter.post(
  "/verifyForgotPasswordOtp",
  coachingAuthentication,
  joiSchemaValidation.validateBody(
    coachingValidationSchema.verifyForgotPasswordOtpSchema
  ),
  coachingController.verifyForgotPasswordOtp
);

coachingRouter.put(
  "/updatePassword",
  coachingAuthentication,
  joiSchemaValidation.validateBody(
    coachingValidationSchema.updatePasswordSchema
  ),
  coachingController.updatePassword
);

module.exports = coachingRouter;
