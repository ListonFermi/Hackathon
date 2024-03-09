const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ["female"] },
  reviewsId : [{ type: mongoose.Types.ObjectId, ref: "reviews" }],
  questionsId : [{ type: mongoose.Types.ObjectId, ref: "questions" }],
  answersId : [{ type: mongoose.Types.ObjectId, ref: "answers" }],
});

const userCollection = mongoose.model("users", userSchema);

module.exports = userCollection;