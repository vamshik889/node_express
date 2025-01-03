const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const OrderSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
});

const Order = mongoose.model("Order", OrderSchema);

const User = mongoose.model("Customer", UserSchema);

module.exports = {
  User,
  Order,
};
