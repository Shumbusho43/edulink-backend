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