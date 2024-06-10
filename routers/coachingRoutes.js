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
  joiSchemaValidation.validateBody(
    coachingValidationSchema.verifyForgotPasswordOtpSchema
  ),
  coachingAuthentication,
  coachingController.verifyForgotPasswordOtp
);

coachingRouter.put(
  "/updatePassword",
  joiSchemaValidation.validateBody(
    coachingValidationSchema.updatePasswordSchema
  ),
  coachingAuthentication,
  coachingController.updatePassword
);

module.exports = coachingRouter;
