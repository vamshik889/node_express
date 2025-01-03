const express = require("express")

const studentRouter = express.Router();

studentRouter.get("/",(req,res)=>{
    res.send("All students")
})

studentRouter.post("/addstudent",(req,res)=>{
    console.log(req.body);
    res.send("Added a student")
});

module.exports = {studentRouter}