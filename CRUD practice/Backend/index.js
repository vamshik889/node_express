const express = require("express");

const app = express();
const dotenv = require("dotenv");
const connection = require("./db/dbConnection");

const { userRouter } = require("./routes/User.routes");

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage")
});

app.use("/user",userRouter);
app.listen(process.env.PORT, async()=>{
    try {
        await connection;
    } catch (error) {
        console.log(error, "failed to connect to db")
    }
    console.log(`listening to PORT ${process.env.PORT}`)

})  