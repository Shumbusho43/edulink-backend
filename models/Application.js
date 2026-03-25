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
  coverLetter: {
    type: String,
    required: true,
    trim: true
  },
  resumeUrl: {
    type: String,
    default: ""
  },
  cvFile: {
    type: String,
    default: ""
  },
  screeningAnswers: {
    type: [String],
    default: []
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

applicationSchema.path("resumeUrl").validate(function resumeOrCvValidator(value) {
  return Boolean((value && value.trim()) || (this.cvFile && this.cvFile.trim()));
}, "Provide either resumeUrl or cvFile");

module.exports = mongoose.model("Application", applicationSchema);