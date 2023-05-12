const express = require("express");
require("express-async-errors");
const cors = require("cors");

const morgan = require("morgan");
require("dotenv").config();
require("./db/");

const port = 8000;
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");
const { handleNotFound } = require("./utils/helper");
// app.use(cors());

const app = express();
require("dotenv").config();
app.use(cors());

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);
app.use((err, req, res, next) => {
  console.log("err: ", err);
  res.status(500).json({ error: err.msg || err });
});
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("<h1>Welcome to home page</h1>");
});

// app.post(
//   "/sign-in",
//   (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.json({ error: "email or passwor missing" });
//     next();
//   },
//   (req, res) => {
//     res.send("this is about page");
//   }
// );

app.post;
app.use("/*", handleNotFound);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
