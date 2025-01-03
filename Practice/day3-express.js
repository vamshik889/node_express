//1) basic

// const express = require("express");
// let app = express();
// app.use(express.json());

// app.get("/v1",(req,res)=>{
// res.send("from v1 page")
// });
// app.post("adddata",(req,res)=>{
// res.send("data recorded successfully")
// });

// app.listen("7600",()=>{
//     console.log("listening to port 7600")
// })

//2)sending the data 

// Importing necessary modules
const express = require("express");
const fs = require("fs");

// Initializing the Express application
let app = express();

// Middleware to parse JSON bodies from requests
app.use(express.json());

// GET endpoint to fetch all students
app.get("/students", (req, res) => {
    try {
        // Read the db.json file and parse its content
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        
        // Log the student data for debugging purposes
        console.log(data.students);
        
        // Send the students array as JSON response
        res.json(data.students);
    } catch (error) {
        // Handle errors like missing or corrupt db.json file
        console.error("Error reading db.json:", error);
        res.status(500).send("Server error while fetching students.");
    }
});

// POST endpoint to add a new student
app.post("/addstudent", (req, res) => {
    try {
        // Read the current data from db.json
        let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        
        // Add the new student from the request body
        data.students.push(req.body);
        
        // Write the updated data back to db.json
        fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
        
        // Send a success response
        res.send("Student data has been added successfully");
    } catch (error) {
        // Handle errors like missing or corrupt db.json file
        console.error("Error updating db.json:", error);
        res.status(500).send("Server error while adding a student.");
    }
});

// Start the server and listen on port 7880
app.listen(7880, () => {
    console.log("Listening to port 7880");
});
