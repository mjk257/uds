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

router.get('/ranges', (req, res) => {
  City.aggregate([
    { "$group": { 
      "_id": null,
      "max_population": { "$max": "$population" }, 
      "min_population": { "$min": "$population"},
      "avg_population": { "$avg": "$population" },
      "max_density": { "$max": "$density" }, 
      "min_density": { "$min": "$density"},
      "avg_density": { "$avg": "$density" },
      "max_age": { "$max": "$median_age" }, 
      "min_age": { "$min": "$median_age"},
      "avg_age": { "$avg": "$median_age" },
      "max_summer_temp": { "$max": "$summer_temp" }, 
      "min_summer_temp": { "$min": "$summer_temp"},
      "avg_summer_temp": { "$avg": "$summer_temp" },
      "max_winter_temp": { "$max": "$winter_temp" }, 
      "min_winter_temp": { "$min": "$winter_temp"},
      "avg_winter_temp": { "$avg": "$winter_temp" },
      "max_rain": { "$max": "$annual_precipitation" }, 
      "min_rain": { "$min": "$annual_precipitation"},
      "avg_rain": { "$avg": "$annual_precipitation" },
      "max_snow": { "$max": "$annual_snow" }, 
      "min_snow": { "$min": "$annual_snow"},
      "avg_snow": { "$avg": "$annual_snow" },
  }}]
  ).then(results => {
    res.json(results[0]);
  })
})

module.exports = router;