const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const {connection} = require("../backend/db/dbconnection");
const cors = require("cors")

const {userRouter} = require("../Backend/routes/user.route")

const app = express();
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Homepage")
});

app.use("/user",userRouter);



app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB connection is successful");
  } catch (error) {
    console.log(error);
  }
  console.log(`listening to PORT : ${process.env.PORT}`);
});
