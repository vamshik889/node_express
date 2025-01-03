const express = require("express")

const teacherRouter = express.Router();

teacherRouter.get("/",(req,res)=>{
    res.send("All teachers")
})

teacherRouter.post("/addteacher",(req,res)=>{
    console.log(req.body);
    res.send("Added a teacher")
});


module.exports = {teacherRouter}