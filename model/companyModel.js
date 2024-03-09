const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  maleCount: { type: Number, required: true } ,
  femaleCount: { type: Number, required: true },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "reviews" }],
  questions: [{ type: mongoose.Types.ObjectId, ref: "questions" }],
});

const companyCollection = mongoose.model("company", companySchema, "company");

module.exports = companyCollection;