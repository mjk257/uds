const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

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

  testCities = [{id: 1, name: 'Clevland'}, {id: 2, name: 'New York'}, {id: 3, name: 'Seattle'}]

  /* CALL TO DATABASE */

  res.json(testCities)
});

// Api route, get city info given id
app.get('/api/cities/:id', (req, res) => {

  const {id} = req.params;
  testCities = [{id: 1, name: 'Cleveland', population: '367,991', avg_salary: 21507}, {id: 2, name: 'New York'}, {id: 3, name: 'Seattle'}]

  /* CALL TO DATABASE*/

  const city = testCities.find(c => c.id == id);

  res.json(city);
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
