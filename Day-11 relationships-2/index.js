const express = require("express");
const { connection } = require("./database");
const { User, Product } = require("./clientProductSchema");

const app = express();
app.use(express.json());
//
app.post("/client", async (req, res) => {
  const products = await Product.insertMany(req.body.products);

  const productIds = products.map((product) => product._id);

  const users = await User.create({
    ...req.body.user,
    purchaseByProducts: productIds,
  });

  //update product to reference the user

  await Product.updateMany(
    { _id: { $in: productIds } },
    { $push: { purchaseByUsers: users._id } }
  );

  res.json(users);
});

app.get("/client/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    "purchaseByProducts"
  );
  res.json(user);
});

app.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "purchaseByUsers"
  );
  res.json(product);
});
app.listen("4676", async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("connection to db failed !");
    console.log(error);
  }
  console.log("running on server at 4676");
});

