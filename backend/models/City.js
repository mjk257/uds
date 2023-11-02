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
    occupation_data: Map
});

module.exports = mongoose.model('City', citySchema, 'cities');