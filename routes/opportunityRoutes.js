const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getOpportunities,
  getMyOpportunities
} = require("../controllers/opportunityController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/opportunities",authMiddleware, getOpportunities);
router.post("/opportunities", authMiddleware, createOpportunity);
router.get("/opportunities/me", authMiddleware, getMyOpportunities);

module.exports = router;