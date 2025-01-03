const express = require("express");
const { connection } = require("./database");
const { UserModel } = require("./user/userSchema");

const app = express();

app.use(express.json());

// home url
app.get("/", (req, res) => {
  res.send("welcome");
});

//post users
app.post("/createuser", async (req, res) => {
  const data = req.body;

  try {
    const user = new UserModel(req.body);

    await user.save();
    res.send("user has been created");
  } catch (error) {
    console.log(error);
  }
});

//get users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    // this simillar to db.collectionName.find()

    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

//update
app.patch("/editusers/:userID", async (req, res) => {
  const userID = req.params.userID;

  const payload = req.body;

  try {
    const query = await UserModel.findByIdAndUpdate({ _id: userID }, payload);
    res.send("user has been updated");
  } catch (error) {
    console.log(error);
    res.send("err:", "something went wrong");
  }
});

//delete
app.delete("/removeuser/:userID", async (req, res) => {
  const userID = req.params.userID;
  console.log(userID);
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.send(`user with userID: ${userID} has been delete`);
  } catch (error) {
    console.log("error in deleting");
  }
});

//running server + mongodb
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
