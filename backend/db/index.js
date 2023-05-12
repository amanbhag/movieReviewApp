const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((ex) => {
    console.log("failed to connect:", ex);
  });
