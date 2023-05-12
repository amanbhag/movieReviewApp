const nodemailer = require("nodemailer");

exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += Math.floor(Math.random() * 10);
    console.log("OTP: ", OTP);
  }

  return OTP;
};

exports.genrateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    }
  );
  return {
    url,
    public_id,
  };
};
