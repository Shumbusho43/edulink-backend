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
    )
      .populate("postedBy", "name email role")
      .lean();

    const opportunityIds = opportunities.map(opportunity => opportunity._id);
    const applications = await Application.find({ opportunity: { $in: opportunityIds } })
      .populate("user", "name email role")
      .lean();

    const applicationsByOpportunity = applications.reduce((acc, application) => {
      const opportunityId = application.opportunity.toString();
      if (!acc[opportunityId]) {
        acc[opportunityId] = [];
      }
      acc[opportunityId].push(application);
      return acc;
    }, {});

    const opportunitiesWithApplications = opportunities.map(opportunity => ({
      ...opportunity,
      applications: applicationsByOpportunity[opportunity._id.toString()] || []
    }));
    res.json(opportunitiesWithApplications);
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
     
    const opportunityId = req.params.id;
    const applications = await Application.find({ opportunity: opportunityId })
      .populate("user", "name email");
    res.json(applications);
  } catch (error) {
    console.log(error);
    
    res.status(500).json(error);
  }
};

exports.getUserOpportunityStats = async (req, res) => {
  try {
      // #swagger.tags = ['Statistics']
    const userId = req.user.id;
    const role = req.user.role;

    let opportunityFilter = {};
    let applicationFilter = {};
    
    // Role-based filtering
    if (role === "user") {
      opportunityFilter = { postedBy: userId };
    }

    // Count opportunities
    const totalOpportunities = await Opportunity.countDocuments(opportunityFilter);

    if (role === "user") {
      const postedOpportunityIds = await Opportunity.find(opportunityFilter).distinct("_id");
      applicationFilter = { opportunity: { $in: postedOpportunityIds } };
    }
    
    // Aggregate application stats in ONE query
    const applicationStats = await Application.aggregate([
      { $match: applicationFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Default values
    let totalApplications = 0;
    let pendingApplications = 0;
    let approvedApplications = 0;
    let rejectedApplications = 0;

    // Map results
    applicationStats.forEach(stat => {
      const status = stat._id;
      totalApplications += stat.count;
      if (status === "Pending") pendingApplications = stat.count;
      if (status === "Accepted") approvedApplications = stat.count;
      if (status === "Rejected") rejectedApplications = stat.count;
    });

    res.json({
      totalOpportunities,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};