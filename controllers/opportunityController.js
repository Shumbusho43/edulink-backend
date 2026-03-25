const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");

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
    const userId= req.user ? req.user.id : null;
    const opportunities = await Opportunity.find(
      //exclude opportunities posted by the current user
      userId ? { postedBy: { $ne: userId } } : {}
    );
    res.json(opportunities);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get opportunities posted by the current user
exports.getMyOpportunities = async (req, res) => {
  try {
     // #swagger.tags = ['Opportunities']
    const opportunities = await Opportunity.find({ postedBy: req.user.id });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get applications for a specific opportunity
exports.getOpportunityApplications = async (req, res) => {
  try {
     // #swagger.tags = ['Opportunities']
     console.log("called");
     
    const opportunityId = req.params.id;
    const applications = await Application.find({ opportunity: opportunityId })
      .populate("user", "name email");
    res.json(applications);
  } catch (error) {
    console.log(error);
    
    res.status(500).json(error);
  }
};