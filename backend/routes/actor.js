const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  searchActor,
  getLatestActors,
  getSingleActor,
} = require("../controllers/actor");
const { uploadImage } = require("./middlewares/multer");
const { actorInfoValidator, validate } = require("./middlewares/validator");
const { isAuth, isAdmin } = require("./middlewares/auth");
const router = express.Router();

router.post(
  "/create",
  uploadImage.single("avatar"),
  isAuth,
  isAdmin,
  actorInfoValidator,

  validate,
  createActor
);
router.post(
  "/upload/:actorId",
  uploadImage.single("avatar"),
  isAuth,
  isAdmin,
  actorInfoValidator,
  validate,
  updateActor
);
router.delete("/:actorId", isAuth, isAdmin, removeActor);
router.get("/search", isAuth, isAdmin, searchActor);
router.get("/latest-uploads", isAuth, isAdmin, getLatestActors);
router.get("/single/:id", getSingleActor);
module.exports = router;
