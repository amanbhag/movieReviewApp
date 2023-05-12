const { check, validationResult } = require("express-validator");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name is missing")
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be 8 to 30 characters long"),
];
exports.passwordValidator = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is missing")
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be 8 to 30 characters long"),
];
exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is missing")
    .isLength({ min: 8, max: 30 })
    .withMessage("password must be 8 to 30 characters long"),
];
exports.actorInfoValidator = [
  check("name").trim().not().isEmpty().withMessage("name is missing"),
  check("about").trim().not().isEmpty().withMessage("about is missing"),
  check("gender").trim().not().isEmpty().withMessage("gender is missing"),
];
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.json({ err: error[0].msg });
  }

  next();
};
