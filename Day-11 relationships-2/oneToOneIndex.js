const express = require("express");
const { connection } = require("./database");
const { User, Address } = require("./userAddressSchema");

const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
  const address = await Address.create(req.body.address); //create a address doc.
  const user = await User.create({ ...req.body.user, address: address._id });
  res.json(user);
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("address");
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
