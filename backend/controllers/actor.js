const Actor = require("../models/actor");
const { isValidObjectId } = require("mongoose");

const {
  sendError,
  uploadImageToCloud,
  formatActor,
} = require("../utils/helper");
const cloudinary = require("../cloud/index");

// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });

  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    newActor.avatar = { url, public_id };
  }
  await newActor.save();
  console.log("newActor: ", newActor);
  res.status(201).json({
    id: newActor._id,
    name,
    about,
    gender,
    avatar: newActor.avatar?.url,
  });
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { actorId } = req.params;
  console.log("actorId: ", actorId);
  if (!isValidObjectId(actorId)) return sendError(res, "invalid user id");
  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "invalid request record not found");
  const public_id = actor.avatar?.public_id;
  console.log("actor.avatar?.public_id: ", actor.avatar.public_id);
  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok") {
      return sendError(res, "could not remove image from cloud");
    }
  }
  if (file) {
    const { url, public_id } = await uploadImageToCloud(file.path);
    actor.avatar = { url, public_id };
  }
  actor.name = name;
  actor.about = about;
  actor.gender = gender;
  await actor.save();
  console.log("newActor: ", actor);
  res.status(201).json(formatActor(actor));
};

exports.removeActor = async (req, res) => {
  const { actorId } = req.params;
  console.log("actorId: ", actorId);
  if (!isValidObjectId(actorId)) return sendError(res, "invalid user id");
  const actor = await Actor.findById(actorId);
  if (!actor) return sendError(res, "invalid request record not found");
  const public_id = actor.avatar?.public_id;
  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== "ok") {
      return sendError(res, "could not remove image from cloud");
    }
  }
  await Actor.findByIdAndDelete(actorId);
  res.status(201).json({ message: "Request removed successfully" });
};

exports.searchActor = async (req, res) => {
  const { query } = req;
  console.log("query: ", query);
  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  const actors = result.map((actor) => formatActor(actor));

  res.json(actors);
};

exports.getLatestActors = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: "-1" }).limit(12);
  res.json(result);
};
exports.getSingleActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "invalid user id");
  const result = await Actor.findById(id);
  if (!result) return sendError(res, "invalid request record not found", 404);
  res.json(result);
};
