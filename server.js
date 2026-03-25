const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./swaggerDocs.json');

const app = express();
// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile, false, {
    docExpansion: "none"
}));
// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/opportunityRoutes"));
app.use("/api", require("./routes/applicationRoutes"));
app.use("/api", require("./routes/statisticsRoutes"));

app.get("/", (req, res) => {
  res.send("EduLink API Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));