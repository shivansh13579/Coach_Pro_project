const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, message) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOption = {
      from: "shivam123@gamil.com", // sender address
      to: email, // list of receivers
      subject: subject,
      html: message,
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    response.errors = error.message;
    return response;
  }
};
