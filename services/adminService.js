const Admin = require("../models/adminModel");
const serverResponse = require("../constants/serverResponse");
const lodash = require("lodash");
const { adminMessage, commanMessage } = require("../constants/message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendEmail");

// const generateAccessAndRefreshTokens = async (userId) => {
//   try {
//     const user = await User.findById(userId);

//     const accessToken = user.generateJwtAccessToken;
//     const refreshToken = user.generateJwtRefreshToken;

//     user.refreshToken = refreshToken;

//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports.registerAdmin = async function (serviceData) {
//   const response = lodash.cloneDeep(serverResponse);
//   try {
//     // store data to database

//     const admin = await Admin.findOne({ email: serviceData.email });

//     if (!admin) {
//       response.errors.email = adminMessage.EMAIL_ALREADY_EXIST;
//       response.message = adminMessage.VALIDATION_FAILED;
//       return response;
//     }

//     serviceData.password = await bcrypt.hash(serviceData.password, 10);

//     const adminUser = await admin.create(serviceData);

//     const adminData = await adminUser.save();

//     if (adminData) {
//       const token = jwt.sign(
//         { id: adminData._id },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: process.env.JWT_EXPIRY_KEY }
//       );
//       response.status = 200;
//       response.message = adminMessage.ADMIN_CREATED;
//       response.body = { adminData, token };
//     } else {
//       response.message = adminMessage.ADMIN_NOT_CREATED;
//       return response
//     }

//     return response;
//   } catch (error) {
//     response.message = error.message;
//     response.errors = error;
//     return response;
//   }
// };

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
    adminUser.password = undefined;

    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_KEY,
    });

    // Generate JWT token
    // const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: process.env.JWT_EXPIRY_KEY,
    // });

    response.status = 200;
    response.message = adminMessage.ADMIN_CREATED;
    response.body = { adminUser, token };
    return response;
  } catch (error) {
    response.status = 500;
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

// module.exports.loginAdmin = async function (serviceData) {
//   const response = lodash.cloneDeep(serverResponse);
//   try {
//     const admin = await Admin.findOne({ email: serviceData.email });
//     console.log("admin", admin);
//     if (!admin) {
//       response.message = adminMessage.EMAIL_AND_PASSWORD_NOT_MATCH;
//       response.errors.email = commanMessage.EMAIL_NOT_MATCHED;
//       response.errors.password = commanMessage.PASSWORD_NOT_MATCHED;
//       return response;
//     }

//     const comparePassword = bcrypt.compareSync(
//       serviceData.password,
//       admin.password
//     );

//     if (!comparePassword) {
//       response.errors.password = comparePassword.PASSWORD_NOT_MATCHED;
//       response.message = comparePassword.LOGIN_SUCCESS;
//       return response;
//     }

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: process.env.JWT_EXPIRY_KEY,
//     });

//     admin.password = undefined;

//     response.status = 200;
//     response.body = { admin, token };
//     return response;
//   } catch (error) {
//     response.errors = error;
//     response.message = error;
//     return response;
//   }
// };

module.exports.loginAdmin = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const admin = await Admin.findOne({ email: serviceData.email }).select(
      "+password"
    );
    console.log("admin", admin);

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
    // const comparePassword = await bcrypt.compareSync(
    //   serviceData.password,
    //   admin.password
    // );

    if (!isPasswordValid) {
      response.status = 400;
      response.message = adminMessage.EMAIL_AND_PASSWORD_NOT_MATCH;
      response.errors = { password: commanMessage.PASSWORD_NOT_MATCHED };
      return response;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_KEY,
    });

    // Hide the password before returning the admin object
    admin.password = undefined;

    response.status = 200;
    response.message = adminMessage.LOGIN_SUCCESS;
    response.body = { admin, token };

    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.updateAdmin = async function (adminId, updateData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const admin = await Admin.findById(adminId);
    console.log("admin1", admin);
    if (!admin) {
      response.errors = adminMessage.ADMIN_NOT_FOUND;
      return response;
    }

    // hash password

    // if (serviceData.password) {
    //   serviceData.password = await bcrypt.hash(serviceData.password, 10);
    // }

    // update admin details
    const updateAdmin = await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    });

    if (updateAdmin) {
      response.status = 200;
      response.message = adminMessage.ADMIN_UPDATED;
      response.body = updateAdmin;
    } else {
      response.status = 400;
      response.errors = adminMessage.ADMIN_NOT_UPDATED;
    }

    return response;
  } catch (error) {
    response.status = 500;
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
      response.message = commanMessage.EMAIL_REQUIRED;
      return response;
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    admin.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetPasswordUrl = `${porcess.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const subject = "Reset Password";

    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>
    /nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.
    \nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try {
      await sendMail(email, message, subject);

      response.message = `Reset password token has been sent to ${email} successfully`;
      return response;
    } catch (error) {
      admin.forgotPasswordToken = undefined;
      admin.forgotPasswordExpiry = undefined;

      await admin.save();

      response.errors = error.message;
      return response;
    }
  } catch (error) {}
};

module.exports.resetPassword = async function (resetToken, password) {
  const response = lodash.cloneDeep(serverResponse);

  try {
    Admin.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const admin = await Admin.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      response.message = "Token is invalid or expired,please try again";
      return response;
    }

    user.password = password;
    admin.forgotPasswordToken = undefined;
    admin.forgotPasswordExpiry = undefined;

    admin.save();

    response.status = 200;
    response.message = commanMessage.PASSWORD_RESET;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

// module.exports.deleteAdmin = async function (serviceData) {
//   const response = lodash.cloneDeep(serverResponse);

//   try {
//     const admin = await Admin.findByID({ id: serviceData.id });

//     if (!admin) {
//       response.status = 404;
//       response.message = adminMessage.ADMIN_NOT_FOUND;
//       return response;
//     }

//     await admin.remove();

//     response.status = 200;
//     response.message = adminMessage.ADMIN_DELETE;
//     return response;
//   } catch (error) {}
// };
