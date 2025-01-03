const express = require("express");
const {studentRouter } = require("./routes/student.router");
const {teacherRouter} = require("./routes/teacher.route");
const app = express();

app.use(express.json());

app.use("/students",studentRouter);
app.use("/teachers",teacherRouter);
app.get("/",(req,res)=>{
    res.send("homepage")
})

app.listen("8081",()=>{
    console.log("listening to server 8081")
})