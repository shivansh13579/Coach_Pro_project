const Admin = require("../models/adminModel");
const serverResponse = require("../constants/serverResponse");
const lodash = require("lodash");
const { adminMessage, commanMessage } = require("../constants/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

module.exports.registerAdmin = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    // Check if the admin already exists
    const admin = await Admin.findOne({ email: serviceData.email });

    if (admin) {
      response.status = 400;
      response.message = adminMessage.VALIDATION_FAILED;
      response.errors = { email: adminMessage.EMAIL_ALREADY_EXIST };
      return response;
    }

    // Hash the password
    serviceData.password = await bcrypt.hash(serviceData.password, 10);

    // Create and save the new admin
    const adminUser = await Admin.create(serviceData);

    await adminUser.save();

    response.status = 200;
    response.message = adminMessage.ADMIN_CREATED;
    const isModified = adminUser.toObject();
    response.body = isModified;
    return response;
  } catch (error) {
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    response.errors = error;
    return response;
  }
};

module.exports.loginAdmin = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const admin = await Admin.findOne({ email: serviceData.email });

    if (!admin) {
      response.status = 400;
      response.message = adminMessage.EMAIL_AND_PASSWORD_NOT_MATCH;
      response.errors = {
        email: commanMessage.EMAIL_NOT_MATCHED,
        password: commanMessage.PASSWORD_NOT_MATCHED,
      };
      return response;
    }

    const isPasswordValid = await bcrypt.compare(
      serviceData.password,
      admin.password
    );

    if (!isPasswordValid) {
      response.message = commanMessage.PASSWORD_NOT_MATCHED;
      response.errors = { password: commanMessage.PASSWORD_NOT_MATCHED };
      return response;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const modifiedData = admin.toObject();
    response.status = 200;
    response.message = commanMessage.ADMIN_LOGIN_SUCCESS;
    response.body = { ...modifiedData, token };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.updateAdmin = async function (id, updateData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    // update admin details
    const admin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!admin) {
      response.status = 400;
      response.errors.error = adminMessage.ADMIN_NOT_FOUND;
      return response;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const updateAdmin = await admin.save();

    if (updateAdmin) {
      response.status = 200;
      response.message = adminMessage.ADMIN_UPDATED;
      const modifiedData = updateAdmin.toObject();
      response.body = { ...modifiedData, token };
      return response;
    } else {
      response.status = 400;
      response.errors.error = adminMessage.ADMIN_NOT_UPDATED;
      response.message = adminMessage.ADMIN_NOT_UPDATED;
      return response;
    }
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.forgotPassword = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const admin = await Admin.findOne({ email: serviceData.email });

    if (!admin) {
      response.errors = { email: commanMessage.EMAIL_NOT_MATCHED };
      response.message = commanMessage.EMAIL_NOT_MATCHED;
      return response;
    }

    const otp = Math.floor(Math.random() * (9999 - 1000));

    admin.otp = otp.toString();
    admin.otpExpiredAt = Date.now() + 15 * 60 * 1000;

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await admin.save();
    const emailOpt = sendEmail.sendMail(admin.email, otp);

    if (!emailOpt) {
      response.errors = { otp: adminMessage.OTP_RESEND };
      response.message = adminMessage.OTP_RESEND;
      return response;
    }

    const modifiedData = admin.toObject();
    response.status = 200;
    response.body = { ...modifiedData, token };
    return response;
  } catch (error) {
    response.errors.error = error.message;
    return response;
  }
};

module.exports.verifyForgotPasswordOtp = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const admin = await Admin.findOne({
      _id: serviceData.admin._id,
      otp: serviceData.otp,
      otpExpiredAt: { $gt: Date.now() },
    });

    if (!admin) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { error: commanMessage.INVALID_ID };
      return response;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await admin.save();
    const modifiedData = admin.toObject();

    response.status = 200;
    response.message = commanMessage.VERIFY_OTP;
    response.body = { ...modifiedData, token };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.updatePassword = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const admin = await Admin.findById(serviceData.admin._id);

    if (!admin) {
      response.message = commanMessage.INVALID_ID;
      return response;
    }

    const hashedpassword = await bcrypt.hash(serviceData.password, 10);

    admin.password = hashedpassword;
    const updateData = await admin.save();
    if (!updateData) {
      response.message = adminMessage.PASSWORD_NOT_UPDATED;
      response.errors.error = adminMessage.PASSWORD_NOT_UPDATED;
      return response;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    const modifiedData = updateData.toObject();
    response.status = 200;
    response.message = adminMessage.PASSWORD_UPDATED;
    response.body = { ...modifiedData, token };
    return response;
  } catch (error) {
    response.errors.error = error.message;
    response.message = error.message;
    return response;
  }
};
