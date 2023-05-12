let User = require("../models/user");
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

const { isValidObjectId } = require("mongoose");
const EmailVerificationToken = require("../models/emailVerificationToken");
const emailVerificationToken = require("../models/emailVerificationToken");
const { generateOTP, genrateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomBytes } = require("../utils/helper");
const user = require("../models/user");
const passwordResetToken = require("../models/passwordResetToken");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "The email is already in use", 401);
  let newUser = new User({ name, email, password });
  await newUser.save();
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
    console.log("OTP: ", OTP);
  }

  let newEmailVerificationToken = new emailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "57da03a7e54533",
      pass: "c0807fa37f7e83",
    },
  });

  transport.sendMail({
    from: "verification@review.com",
    to: newUser.email,
    subject: "email Verification",
    html: `<p>your email verification OTP is</p>
    <h1>${OTP}</h1>`,
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "user not found!" });

  if (user.isVerified) return res.json({ error: "user is already verified!" });
  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return res.json({ error: "token not found!" });

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return res.json({ error: "Please submit a valid OTP!" });

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "57da03a7e54533",
      pass: "c0807fa37f7e83",
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: "<h1>Welcome to our app and thanks for choosing us.</h1>",
  });
  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
    },
    message: "your email is verified successfully",
  });
};

exports.resendEmailVerificationToken = async (req, res) => {
  let { userId } = req.body;
  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "user not found!" });
  if (user.isVerified) return res.json({ error: "user is already verified" });
  let alreadyHasToken = await emailVerificationToken.findOne({ owner: userId });
  if (alreadyHasToken)
    return res.json({ error: "Please try again after one hour" });

  let OTP = generateOTP();

  let newEmailVerificationToken = new emailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  var transport = genrateMailTransporter();

  transport.sendMail({
    from: "verification@review.com",
    to: user.email,
    subject: "email Verification",
    html: `<p>your email verification OTP is</p>
      <h1>${OTP}</h1>`,
  });

  res.status(201).json({
    message:
      "Plase verify your email otp has been sent to your email account again",
  });
};

exports.forgetPassowrd = async (req, res) => {
  let { email } = req.body;
  if (!email) return sendError(res, "enter valid email", 401);
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "user not found", 404);

  let alreadyHasToken = await passwordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "you have already requested to reset password please try again after one hour",
      401
    );
  const token = await generateRandomBytes();
  const newPasswordResetToken = await new passwordResetToken({
    owner: user._id,
    token: token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  var transport = genrateMailTransporter();

  transport.sendMail({
    from: "security@review.com",
    to: user.email,
    subject: "Reset password link",
    html: `<p>Click below to reset password</p>
      <a href="${resetPasswordUrl}">Click here</a>`,
  });

  res.status(201).json({
    message: "Link sent to your email",
  });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};
exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;
  const user = await User.findById(userId);
  console.log("user: ", user);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one!"
    );
  user.password = newPassword;
  await user.save();
  // await passwordResetToken.findByIdAndDelete(req.resetToken._id);
  var transport = genrateMailTransporter();

  transport.sendMail({
    from: "security@review.com",
    to: user.email,
    subject: "password reset successfully",
    html: `<h1>password is successfully changed if you have not done it please change your password immediately</h1>`,
  });

  res.json({
    message: "password reset successffull",
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return sendError(res, "invalid email / password ");
  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "invalid password/passord");
  const { _id, name, role } = user;
  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  res.json({
    user: {
      id: _id,
      token: jwtToken,
      name,
      email: user.email,
      role,
      isVerified: user.isVerified,
    },
  });
};

exports.created = async (req, res) => {
  let { name } = req.body;
  console.log("name: ", name);
};
