const nodemailer = require("nodemailer");

const sendEmail = async (toAddress, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailoptions = {
      from: process.env.NODEMAILER_SEND_EMAIL,
      to: `${toAddress}`,
      subject: `${subject}`,
      text: `${message}`,
    };

    const status = await transporter.sendMail(mailoptions);
    return status;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { sendEmail };
