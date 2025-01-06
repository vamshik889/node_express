const express = require("express");

const bcrypt = require("bcrypt");

const connection = require("./dbConnection/db");
const { userRouter } = require("./routes/user.route");

const {auth} = require("./middleware/auth.middleware")

const app = express();
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("homepage");
});

app.use(auth);

app.get("/movies",(req,res)=>{
    res.send("Movies data")
})


const port = "5444";
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("failed to connect to db", error);
  }
  console.log(`listening to port ${port}`);
});
