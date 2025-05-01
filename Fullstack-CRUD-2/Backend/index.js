const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const { NotesRouter } = require("./routes/Notes.routes");
const { UserRouter } = require("./routes/User.routes");

const { connection } = require("./db/dbConnection");
const { auth } = require("./middleware/auth");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/user", UserRouter);

app.use(auth);
app.use("/note", NotesRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connection to DB is successful");
  } catch (error) {
    console.log(error);
  }
  console.log(`listening to port ${process.env.PORT}`);
});
