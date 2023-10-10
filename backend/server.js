require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const dbConnection = require('./dbConn.js');
const City = require('./City.js');

/* NOTE: the 'build' directory is the React build, you have to generate it 
   yourself using 'npm run build' */

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '/build')));

// Middleware to parse JSON requests
app.use(express.json());

// Route to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', '/index.html'));
});

// Api route, get list of all cities
app.get('/api/cities', (req, res) => {
  City.find({}).then(cities => {
    res.json(cities)
  })
});

// Api route, get city info given id
app.get('/api/cities/:id', (req, res) => {
  const {id} = req.params;

  City.findById(id).then(city => {
    res.json(city)
  })
});

// Api route, search for cities with given search criteria
app.post('/api/search', (req, res) => {
  
  const searchCriteria = req.body;

  /* ADD SEARCH FUCNTION CALL */

  res.json(searchCriteria);
});

// Global Error-Handeling MiddleWare. All uncaught error at api endpoints end up here
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
