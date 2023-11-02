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
    partisan_lean: Number, // negative value is more republican, positive is more democratic
    outdoor_score: Number  // closer to 100 means more outdoor activities are available
});

module.exports = mongoose.model('City', citySchema, 'cities');