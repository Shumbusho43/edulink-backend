const Opportunity = require("../models/Opportunity");

// Create opportunity
exports.createOpportunity = async (req, res) => {
  try {
     // #swagger.tags = ['Opportunities']
     const {
      title,
      type,
      description,
      requirements,
      location,
      deadline
     } = req.body;
    const opportunity = await Opportunity.create({
      title,
      type,
      description,
      requirements,
      location,
      deadline,
      postedBy: req.user.id
    });
    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all opportunities
exports.getOpportunities = async (req, res) => {
  try {
     // #swagger.tags = ['Opportunities']
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json(error);
  }
};