const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  requirements: [String],
  location: { type: String },
  deadline: { type: Date },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);