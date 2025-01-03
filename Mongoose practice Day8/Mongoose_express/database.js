// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Establishing a connection to MongoDB
// 'mongoose.connect' is used to connect to the MongoDB instance
// The connection string format is 'mongodb://<host>:<port>/<database-name>'
// In this case, we are connecting to a local MongoDB instance at '127.0.0.1:27017' (localhost on the default port 27017)
// The database we are connecting to is named 'db1'
const connection = mongoose.connect("mongodb://127.0.0.1:27017/db1");

// Exporting the connection object
// The 'connection' object is the promise returned by mongoose.connect, which can be used to check if the connection was successful
module.exports = {
    connection // Exporting the connection object to be used in other parts of the app
};
