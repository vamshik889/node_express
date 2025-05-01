const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()


const dbConnection = mongoose.connect(process.env.mongo_URL);


module.exports= {
    dbConnection
}