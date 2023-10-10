const mongoose = require('mongoose');

const connectionString = "mongodb+srv://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@cluster0.bno5m.mongodb.net/uds?retryWrites=true&w=majority";

mongoose.connect(connectionString);
const dbConnection = mongoose.connection;

dbConnection.on('error', (error) => {
    console.log(error)
})
  
dbConnection.once('connected', () => {
    console.log('Database Connected');
})

module.exports = dbConnection;