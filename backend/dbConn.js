const mongoose = require('mongoose');

const connectionString = proccess.env.MONGODB_URL;
mongoose.connect(connectionString);
const dbConnection = mongoose.connection;

dbConnection.on('error', (error) => {
    console.log(error)
})
  
dbConnection.once('connected', () => {
    console.log('Database connected');
})

module.exports = dbConnection;