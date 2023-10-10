const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    state: String,
    population: Number,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('City', citySchema, 'cities');