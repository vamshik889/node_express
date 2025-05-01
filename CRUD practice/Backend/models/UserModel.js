const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "name":String,
    "age":Number,
    "email":String,
    "password":String
});

const userModel = mongoose.model("users",userSchema);

module.exports = {
    userModel
} 