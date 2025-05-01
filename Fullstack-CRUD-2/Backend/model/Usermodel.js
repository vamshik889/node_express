const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: String,
    name: String,
    age: String
});

const usersModel = mongoose.model("users",UsersSchema);

module.exports = {
    usersModel
}