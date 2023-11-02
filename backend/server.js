const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config({ path: __dirname + "/../.env" });
const port = 5000;

// Connect to database
const dbConnection = require("./dbConn.js");

// Import routing
const apiRoutes = require("./routes/api.js");

/* NOTE: the 'build' directory is the React build, you have to generate it 
   yourself using 'npm run build' */

// Middleware to allow cross-origin requests
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "/build")));

// Middleware to parse JSON requests
app.use(express.json());

// Route to homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "/index.html"));
});

// api routes
app.use("/api", apiRoutes);

// Global Error-Handeling MiddleWare. All uncaught error at api endpoints end up here
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
