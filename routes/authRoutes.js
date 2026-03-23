const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/auth/register", register);
router.post("/auth/login", login);
//get current user
router.get("/auth/me",authMiddleware,getCurrentUser);

module.exports = router;