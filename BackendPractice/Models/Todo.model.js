const mongoose = require("mongoose");

const todoModel = mongoose.Schema({
title:String,
body:{
    type:String,
    required:true
},
status:Boolean
})

const Todo = mongoose.model("todos",todoModel);

module.exports = {
    Todo
}