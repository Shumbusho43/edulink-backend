const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opportunity",
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  rejectionReason: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);