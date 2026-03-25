const Application = require("../models/Application");

// Apply to opportunity
exports.applyToOpportunity = async (req, res) => {
  try {
        // #swagger.tags = ['Applications']
    const userId = req.user.id;
    const { opportunityId } = req.body;

    // Check if already applied
    const existing = await Application.findOne({
      user: userId,
      opportunity: opportunityId
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await Application.create({
      user: userId,
      opportunity: opportunityId
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get user's applications
exports.getMyApplications = async (req, res) => {
   // #swagger.tags = ['Applications']
  try {
    const apps = await Application.find({ user: req.user.id })
      .populate("opportunity");

    res.json(apps);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Decide application status (Accepted/Rejected)
exports.decideApplication = async (req, res) => {
  try {
    // #swagger.tags = ['Applications']
    const { applicationId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Use Accepted or Rejected"
      });
    }

    const application = await Application.findById(applicationId)
      .populate("opportunity", "postedBy");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins are not allowed to decide applications" });
    }

    const isOpportunityOwner = application.opportunity &&
      application.opportunity.postedBy &&
      application.opportunity.postedBy.toString() === req.user.id.toString();

    if (!isOpportunityOwner) {
      return res.status(403).json({ message: "Not authorized to decide this application" });
    }

    application.status = status;
    application.rejectionReason = status === "Rejected" ? (rejectionReason || "") : "";
    await application.save();

    const updatedApplication = await Application.findById(applicationId)
      .populate("user", "name email role")
      .populate("opportunity");

    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json(error);
  }
};