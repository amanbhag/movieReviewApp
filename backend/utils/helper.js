const crypto = require("crypto");
const cloudinary = require("../cloud/index");
const actor = require("../models/actor");

exports.sendError = (res, error, statusCode = 401) => {
  return res.status(statusCode).json({ error });
};

exports.generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(5, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");
      console.log(buffString);
      resolve(buffString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, "not found", 404);
};

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file,
    {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    }
  );
  console.log(public_id);

  return { url, public_id };
};

exports.formatActor = (actor) => {
  const { name, gender, about, _id, avatar } = actor;
  return {
    id: _id,
    name,
    about,
    gender,
    avatar: avatar?.url,
  };
};
