const coachingService = require("../services/coachingServices");

module.exports.registerCoaching = async (req, res) => {
  try {
    const serviceResponse = await coachingService.registerCoaching(req.body);

    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.loginCoaching = async (req, res) => {
  try {
    const serviceResponse = await coachingService.loginCoaching(req.body);

    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updateCoaching = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const serviceResponse = await coachingService.updateCoaching(
      id,
      updateData
    );
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const serviceResponse = await coachingService.forgotPassword(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const coaching = req.coaching;

    const serviceResponse = await coachingService.verifyForgotPasswordOtp({
      coaching,
      otp,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const serviceResponse = await coachingService.updatePassword({
      coaching: req.coaching,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
