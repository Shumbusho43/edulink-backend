const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getOpportunities
} = require("../controllers/opportunityController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/opportunities", getOpportunities);
router.post("/opportunities", authMiddleware, createOpportunity);

module.exports = router;