const express = require('express');
const router = express.Router();
const City = require('../models/City');
const Job = require('../models/Job');
const citySearch = require('../utils/citySearch');

// Api route, get list of all cities
router.get('/cities/', (req, res) => {
    City.find({}).then(cities => {
      res.json(cities)
    });
});

// Api route, get list of all occupations
router.get('/jobs', (req, res) => {
  Job.find({}).then(jobs => {
    res.json(jobs);
  })
})

// Api route, get city info given id
router.get('/cities/:id', (req, res) => {
    const {id} = req.params;
  
    City.findById(id).then(city => {
      res.json(city)
    });
});

router.post('/search', (req, res) => {    
    const searchCriteria = req.body;
  
    City.find({}).then(cities => {
        citySearch(cities, searchCriteria).then(response => res.json(response))
    });
});

module.exports = router;