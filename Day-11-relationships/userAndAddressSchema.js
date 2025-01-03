const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const addressSchema = new mongoose.Schema({
  village: String,
  mandal: String,
  zip: Number,
});
const User = mongoose.model("User",userSchema)
const Address = mongoose.model("Address",addressSchema)
module.exports = {
    User, Address
}