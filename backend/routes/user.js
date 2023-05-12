const express = require("express");
var jwt = require("jsonwebtoken");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassowrd,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
  created,
} = require("../controllers/user");
const { isValidPassResetToken } = require("./middlewares/user");
const {
  userValidator,
  validate,
  passwordValidator,
  signInValidator,
} = require("./middlewares/validator");
const { sendError } = require("../utils/helper");
const User = require("../models/user");
const { isAuth } = require("./middlewares/auth");

const router = express.Router();
router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verify-email", verifyEmail);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});
router.post("/resend-email-verification", resendEmailVerificationToken);
router.post("/forget-password", forgetPassowrd);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  passwordValidator,
  validate,
  passwordValidator,
  resetPassword
);

router.post("/check", created);
module.exports = router;
