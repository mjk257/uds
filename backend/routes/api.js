const express = require('express');
const router = express.Router();
const City = require('../models/City');

// Api route, get list of all cities
router.get('/cities/', (req, res) => {
    City.find({}).then(cities => {
      res.json(cities)
    });
});
  
// Api route, get city info given id
router.get('/cities/:id', (req, res) => {
    const {id} = req.params;
  
    City.findById(id).then(city => {
      res.json(city)
    });
});

router.post('/search', (req, res) => {    
    const searchCriteria = req.body;
  
    /* ADD SEARCH FUCNTION CALL */
  
    res.json(searchCriteria);
});

module.exports = router;