const Router = require("express");
const adminController = require("../controllers/adminController");
const adminAuthentication = require("../middleware/adminAuthentication");
const adminValidationSchema = require("../apiValidationSchemas/adminValidationSchems");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminRouter = Router();

// register
adminRouter.post(
  "/register",
  joiSchemaValidation.validateBody(adminValidationSchema.registerAdminSchema),
  adminController.registerAdmin
);

// login
adminRouter.post(
  "/login",
  joiSchemaValidation.validateBody(adminValidationSchema.loginAdminSchema),
  adminController.loginAdmin
);

// update
adminRouter.put(
  "/update/:id",
  adminAuthentication,
  joiSchemaValidation.validateParams(adminValidationSchema.adminId),
  joiSchemaValidation.validateBody(adminValidationSchema.updateAdminSchema),
  adminController.updateAdmin
);

// forgotPassword
adminRouter.post(
  "/forgotPassword",
  joiSchemaValidation.validateBody(adminValidationSchema.forgotPasswordSchema),
  adminController.forgotPassword
);

// verifyForgotPasswordOtp
adminRouter.post(
  "/verifyForgotPasswordOtp",
  adminAuthentication,
  joiSchemaValidation.validateBody(
    adminValidationSchema.verifyForgotPasswordOtp
  ),
  adminController.verifyForgotPasswordOtp
);

// updatePassword
adminRouter.put(
  "/updatePassword",
  adminAuthentication,
  joiSchemaValidation.validateBody(adminValidationSchema.updatePassword),
  adminController.updatePassword
);

module.exports = adminRouter;
