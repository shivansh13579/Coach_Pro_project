const serverResponse = require("../constants/serverResponse");
const { commanMessage, coachingMessage } = require("../constants/message");
const lodash = require("lodash");
const Coaching = require("../models/coachingModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { formatData } = require("../utils/mongooseUtills");

module.exports.registerCoaching = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existCoaching = await Coaching.findOne({ email: serviceData.email });

    if (existCoaching) {
      response.status = 404;
      response.errors = { email: commanMessage.EMAIL_ALREADY_EXIST };
      response.message = commanMessage.EMAIL_ALREADY_EXIST;
      return response;
    }

    // Hash the password
    serviceData.password = await bcrypt.hash(serviceData.password, 10);

    const coachingUser = await Coaching.create(serviceData);

    await coachingUser.save();

    response.status = 200;
    response.message = coachingMessage.COACHING_CREATED;
    response.body = formatData(coachingUser);
    return response;
  } catch (error) {
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    response.errors = error;
    return response;
  }
};

module.exports.loginCoaching = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const coaching = await Coaching.findOne({ email: serviceData.email });

    if (!coaching) {
      response.errors.error = commanMessage.EMAIL_NOT_MATCHED;
      response.message = commanMessage.EMAIL_NOT_MATCHED;
      return response;
    }

    isPasswordValid = await bcrypt.compare(
      serviceData.password,
      coaching.password
    );

    if (!isPasswordValid) {
      response.message = commanMessage.PASSWORD_NOT_MATCHED;
      response.errors = { password: commanMessage.PASSWORD_NOT_MATCHED };
      return response;
    }

    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    response.status = 200;
    response.message = commanMessage.COACHING_LOGIN_SUCCESS;
    response.body = { ...formatData(coaching), token };
    return response;
  } catch (error) {
    response.errors = error;
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    return response;
  }
};

module.exports.updateCoaching = async (id, updateData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const coaching = await Coaching.findByIdAndUpdate(id, updateData);

    if (!coaching) {
      response.errors.error = coachingMessage.COACHING_NOT_FOUND;
      response.message = coachingMessage.COACHING_NOT_FOUND;
      return response;
    }

    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const updateCoaching = await coaching.save();

    if (updateCoaching) {
      response.status = 200;
      response.message = coachingMessage.COACHING_UPDATED;
      response.body = { ...formatData(updateCoaching), token };
      return response;
    } else {
      response.errors.error = coachingMessage.COACHING_NOT_UPDATED;
      response.message = coachingMessage.COACHING_NOT_UPDATED;
      return response;
    }
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.forgotPassword = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const coaching = await Coaching.findOne({ email: serviceData.email });

    if (!coaching) {
      response.message = commanMessage.EMAIL_NOT_MATCHED;
      response.errors = { email: commanMessage.EMAIL_NOT_MATCHED };
    }

    const otp = Math.floor(Math.random() * (9999 - 1000));

    coaching.otp = otp.toString();
    coaching.otpExpiredAt = Date.now() + 15 * 60 * 1000;

    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await coaching.save();

    const emailOpt = sendEmail.sendMail(coaching.email, otp);

    if (!emailOpt) {
      response.message = commanMessage.OTP_RESEND;
      response.errors = { error: commanMessage.OTP_RESEND };
      return response;
    }

    response.status = 200;
    response.message = commanMessage.OTP_SEND_SUCCESSFULLY;
    response.body = { ...formatData(coaching), token };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.verifyForgotPasswordOtp = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const coaching = await Coaching.findById({
      _id: serviceData?.coaching?._id,
      otp: serviceData.otp,
      otpExpiredAt: { $gt: Date.now() },
    });

    if (!coaching) {
      response.message = commanMessage.INVALID_ID;
      return response;
    }

    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await coaching.save();

    response.status = 200;
    response.message = commanMessage.VERIFY_OTP;
    response.body = { ...formatData(coaching), token };
    return response;
  } catch (error) {
    response.errors = error;
    response.message = error.message;
    return response;
  }
};

module.exports.updatePassword = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const coaching = await Coaching.findById(serviceData.coaching._id);
    if (!coaching) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { error: commanMessage.INVALID_ID };
      return response;
    }

    coaching.password = await bcrypt.hash(serviceData.password, 10);

    const updateData = await coaching.save();

    if (!updateData) {
      response.message = commanMessage.PASSWORD_NOT_UPDATED;
      response.errors = { password: commanMessage.PASSWORD_NOT_UPDATED };
      return response;
    }

    const token = jwt.sign({ id: coaching._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    response.status = 200;
    response.body = { ...formatData(coaching), token };
    response.message = commanMessage.PASSWORD_UPDATED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors.error = error.message;
    return response;
  }
};
