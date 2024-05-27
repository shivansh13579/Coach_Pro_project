const Router = require("express");
const adminController = require("../controllers/adminController");
const authentication = require("../middleware/authenticate");
const adminRouter = Router();

adminRouter.post("/users/adminRegister", adminController.registerAdmin);
adminRouter.post("/users/adminLogin", adminController.loginAdmin);
adminRouter.put(
  "/users/adminUpdate/:id",
  authentication,
  adminController.updateAdmin
);

adminRouter.post("/users/forgotPassword", adminController.forgotPassword);

adminRouter.post("/users/resetPassword", adminController.resetPassword);

adminRouter.delete("/users/deleteAdmin/:id", adminController.deleteAdmin);

module.exports = adminRouter;
