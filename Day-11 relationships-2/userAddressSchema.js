const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  zip: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const Address = mongoose.model("Address", AddressSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Address, User };
