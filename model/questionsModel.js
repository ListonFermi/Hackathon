const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  companyId: { type: mongoose.Types.ObjectId, ref: "company" },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  questions : { type: String, required: true },
  answers: { type: mongoose.Types.ObjectId, ref: "answers" },
});

const questionCollection = mongoose.model("questions", questionSchema);

module.exports = questionCollection;
