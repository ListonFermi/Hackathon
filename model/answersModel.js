const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
    questionId: { type: mongoose.Types.ObjectId, ref: "questions" },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    answers: { type: String, required: true }
})

const answerCollection = mongoose.model("answers", answersSchema);

module.exports = answerCollection;