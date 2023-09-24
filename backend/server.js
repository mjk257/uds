const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

/* NOTE: the 'build' directory is the React build, you have to generate it 
   yourself using 'npm run build' */

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '/build')));

// Define a route to handle all other requests and serve the React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', '/index.html'));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
