const express = require("express");

const cors = require("cors");
const app = express()
const dotenv = require("dotenv");
const { dBconnection } = require("./db/connection");
const router = require("./routes/user.router");
dotenv.config()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/api/auth",router)
app.listen(process.env.PORT || 5000, async()=>{
    try {
        await dBconnection()
        
    } catch (error) {
        console.log(error,"error in db connection")
    }
    finally{
        console.log(`running at PORT ${process.env.PORT}`)
    }
})