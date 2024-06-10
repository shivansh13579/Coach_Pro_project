const nodemailer = require("nodemailer");
const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");

module.exports.sendMail = async (email, otp) => {
  console.log();
  const response = lodash.cloneDeep(serverResponse);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "shivam123@gamil.com", // sender address
      to: email, // list of receivers
      subject: otp,
      html: "That was easy!",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    // return mailResponse;
    console.log(mailResponse);
  } catch (error) {
    response.errors = error.message;
    // return response;
    console.log("response", error);
  }
};
