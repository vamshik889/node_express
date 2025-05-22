const express = require("express");
const dotenv = require("dotenv");
const { connection } = require("./Db connection/db");
dotenv.config();
const cors = require("cors");
const { userRoute } = require("./Routes/User.router");
const app = express();
app.use(cors());
app.use(express.json())


app.use("/user",userRoute)


const PORT = process.env.PORT || 5000
app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("connection to db is successful")
    } catch (error) {
        console.log(error)
    }

    console.log(`listening to PORT ${PORT}`)
})