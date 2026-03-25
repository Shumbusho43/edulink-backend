const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUserOpportunityStats } = require("../controllers/opportunityController");

router.get("/stats", authMiddleware, getUserOpportunityStats);
module.exports = router;