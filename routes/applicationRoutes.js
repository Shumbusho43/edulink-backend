const express = require("express");
const router = express.Router();

const {
  applyToOpportunity,
  getMyApplications
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const { getOpportunityApplications } = require("../controllers/opportunityController");

// Apply
router.post("/applications", authMiddleware, applyToOpportunity);

// Get my applications
router.get("/applications/me", authMiddleware, getMyApplications);
//getOpportunityApplications
router.get("/opportunities/:id/applications", authMiddleware, getOpportunityApplications);

module.exports = router;