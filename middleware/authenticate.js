const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const { commanMessage } = require("../constants/message");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const authorization = req.headers.authorization;
    console.log("authorization", authorization);

    if (!authorization) {
      response.message = commanMessage.ADMIN_NOT_AUTHENTICATE;
      return response;
    }

    const token = authorization?.replace("Bearer ", "").trim();
    console.log("Extracted Token:", token);

    // const token1 = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
    //   expiresIn: process.env.JWT_EXPIRY_KEY,
    // });

    // console.log("Generated Token:", token1);

    let decodeToken;
    try {
      decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decodeToken", decodeToken);
    } catch (error) {
      console.log("Token verification error:", error);
      response.message = commanMessage.ADMIN_NOT_AUTHENTICATE;
      response.errors = error.message;
      return response; // Unauthorized status code
    }

    console.log("ddsdecodeToken", decodeToken);

    const admin = await Admin.findById(decodeToken.id);

    console.log("admin", admin);
    if (!admin) {
      response.message = commanMessage.ADMIN_NOT_AUTHENTICATE;
      return response;
    }

    req.admin = admin;

    next();
  } catch (error) {
    response.message = commanMessage.ADMIN_NOT_AUTHENTICATE;
    response.errors = error.message;
    return response;
  }
};
