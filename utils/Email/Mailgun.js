const dotenv = require("dotenv").config();

const mg = require("mailgun-js");

const sendEmail = async (toAddress, subject, message) => {
  try {
    const mailgun = () =>
      mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
      });

    emailInfo = {
      from: process.env.MAILGUN_SEND_EMAIL,
      to: `${toAddress}`,
      subject: `${subject}`,
      html: `${message}`,
    };

    const status = await mailgun().messages().send(emailInfo);

    return status;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { sendEmail };
