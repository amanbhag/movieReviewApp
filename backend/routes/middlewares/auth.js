var jwt = require("jsonwebtoken");
const User = require("../../models/user");
let { sendError } = require("../../utils/helper");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  console.log("token: ", token);
  if (!token) return sendError(res, "invalid token");
  const jwtToken = token.split("bearer ")[1];
  if (!jwtToken) return sendError(res, "invalid token");
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;
  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found", 404);
  req.user = user;
  next();
};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") return sendError(res, "user not found", 404);
  next();
};
