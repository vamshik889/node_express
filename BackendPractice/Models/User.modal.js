const mongoose = require("mongoose");

const userModel = mongoose.Schema({
name:String,
email:{
    type:String,
    required:true
},
password:String
})

const User = mongoose.model("users",userModel);

module.exports = {
    User
}