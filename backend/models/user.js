const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailVerificationToken = require("./emailVerificationToken");
const saltRounds = 10;

let userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"],
  },
});

userSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compare(token, this.token);
  console.log("this.token: ", this.token);
  console.log("token: ", token);
  return result;
};

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);

  return result;
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
