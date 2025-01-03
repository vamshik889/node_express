const express = require("express");
const { connection } = require("./database");
const { User, Order } = require("./userOrderSchema");

const app = express();
app.use(express.json());

app.post("/customer", async (req, res) => {
  const orders = await Order.insertMany(req.body.orders); //orders array
  const ordersIds = orders.map((order) => order._id); //return array of id
  const user = await User.create({ ...req.body.user, orders: ordersIds });
  res.json(user);
});

app.get("/customer/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("orders");
  res.json(user);
});

app.listen("4676", async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("connection to db failed");
    console.log(error);
  }
  console.log("running on server at 4676");
});
