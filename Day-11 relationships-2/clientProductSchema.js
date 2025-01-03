const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  purchaseByProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ],
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  purchaseByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }],
});

const Product = mongoose.model("Product", ProductSchema);

const User = mongoose.model("Client", UserSchema);

module.exports = {
  User,
  Product,
};
