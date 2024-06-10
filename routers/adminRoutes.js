const Router = require("express");
const adminController = require("../controllers/adminController");
const adminAuthentication = require("../middleware/adminAuthentication");
const adminValidationSchema = require("../apiValidationSchemas/adminValidationSchems");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminRouter = Router();

// register
adminRouter.post(
  "/admins/register",
  joiSchemaValidation.validateBody(adminValidationSchema.registerAdminSchema),
  adminController.registerAdmin
);

// login
adminRouter.post(
  "/admins/login",
  joiSchemaValidation.validateBody(adminValidationSchema.loginAdminSchema),
  adminController.loginAdmin
);

// update
adminRouter.put(
  "/admins/update/:id",
  joiSchemaValidation.validateBody(adminValidationSchema.updateAdminSchema),
  adminAuthentication,
  adminController.updateAdmin
);

// forgotPassword
adminRouter.post(
  "/admins/forgotPassword",
  joiSchemaValidation.validateBody(adminValidationSchema.forgotPasswordSchema),
  adminController.forgotPassword
);

// verifyForgotPasswordOtp
adminRouter.post(
  "/admins/verifyForgotPasswordOtp",
  joiSchemaValidation.validateBody(
    adminValidationSchema.verifyForgotPasswordOtp
  ),
  adminAuthentication,
  adminController.verifyForgotPasswordOtp
);

// updatePassword
adminRouter.put(
  "/admins/updatePassword",
  joiSchemaValidation.validateBody(adminValidationSchema.updatePassword),
  adminAuthentication,
  adminController.updatePassword
);

module.exports = adminRouter;
