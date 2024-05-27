const adminService = require("../services/adminService");

module.exports.registerAdmin = async (req, res) => {
  try {
    const serviceResponse = await adminService.registerAdmin(req.body);
    console.log(serviceResponse);

    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const serviceResponse = await adminService.loginAdmin(req.body);
    console.log("serviceResponse", serviceResponse);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updateAdmin = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    console.log("adminId", adminId);
    updateData = req.body;
    const serviceResponse = await adminService.updateAdmin(adminId, updateData);
    console.log("sss", serviceResponse);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const serviceResponse = await adminService.forgotPassword(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    response.errors = error.message;
    return response;
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const password = req.body.password;
  const serviceResponse = await adminService.resetPassword(
    resetToken,
    password
  );
  res.status(serviceResponse.status).send(serviceResponse);
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    const serverResponse = await adminService.deleteAdmin(req.params.id);
    res.status(serverResponse.status).send(serverResponse);
  } catch (error) {}
};
