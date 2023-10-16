const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    code: String,
    title: String,
    description: String
});

module.exports = mongoose.model('Job', jobSchema, 'jobs');