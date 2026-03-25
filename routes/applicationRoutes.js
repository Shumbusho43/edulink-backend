const express = require("express");
const router = express.Router();

const {
  applyToOpportunity,
  getMyApplications,
  decideApplication
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const { getOpportunityApplications } = require("../controllers/opportunityController");

// Apply
router.post("/applications", authMiddleware, applyToOpportunity);

// Get my applications
router.get("/applications/me", authMiddleware, getMyApplications);

// Decide application (opportunity owner only)
router.put("/applications/:applicationId/decision", authMiddleware, decideApplication);

//getOpportunityApplications
router.get("/opportunities/:id/applications", authMiddleware, getOpportunityApplications);
module.exports = router;