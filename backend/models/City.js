const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    density: Number,
    population: Number,
    name: String,
    state: String,
    longitude: Number,
    latitude: Number,
    rpp: Number,
    climate_zone: String,
    zone_description: String,
    partisan_lean: Number, //negative value is more republican, positive is more democratic
    outdoor_score: Number,  // the closer this value is to 100, the better suited the city is for outdoor recreation
    occupation_data: Map // info not in database but is for returning job information back to frontend
});

module.exports = mongoose.model('City', citySchema, 'cities');