// Importing required modules
const express = require("express");    // Express.js library for creating a server
const mongoose = require("mongoose");  // Mongoose library to interact with MongoDB
const { UserModel } = require("./userSchema");  // Importing the UserModel from the userSchema.js file
const connection = require("./database");  // Importing the database connection logic from the database.js file

// Create an instance of the express app
const app = express();

// Middleware to parse incoming JSON data from requests
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage")
})

// GET route to retrieve all users from the database
app.get("/users", async (req, res) => {
  try {
    // Using the find() method of Mongoose to fetch all users from the 'user' collection
    const users = await UserModel.find();

    // Sending the list of users as the response to the client
    res.send(users);
  } catch (error) {
    // In case of any error, log it to the console
    console.log(error);
    // Sending an error message back to the client
    res.status(500).send("Error fetching users");
  }
});

// POST route to create a new user and save it to the database
app.post("/createuser", async (req, res) => {
  try {
    // Creating a new user instance using the UserModel and passing the request body (user data) to it
    const user = new UserModel(req.body);

    // Saving the user instance to the database
    await user.save();

    // Sending a success message back to the client
    res.send("User added successfully");
  } catch (error) {
    // In case of any error during user creation, log it to the console
    console.log(error);
    // Sending an error message back to the client
    res.status(400).send("Error adding user");
  }
});

//Patch 
app.patch("/editUsers/:user_Id", async(req,res)=>{
  const userId = req.params.user_Id;
  const payload = req.body;
  try{
    const query = await UserModel.findByIdAndUpdate({_id:userId},payload);
    res.send("User updated successfully")
  }
  catch(error){
    console.log(error)
  }
})

//delete
app.delete("/deleteuser/:user_Id",async(req,res)=>{
  const userId = req.params.user_Id;
  
  try{
    await UserModel.findByIdAndDelete({_id:userId});
    res.send("user deleted successfully")
  }
  catch(error){
    console.log(error,"failed to delete user")
  }
})


// Starting the server and listening on port 5100
app.listen("5100", async () => {
  try {
    // Awaiting the database connection before starting the server
    await connection;
    console.log("Connection to DB successful");
  } catch (error) {
    // If there is an error connecting to the database, log it
    console.log(error);
    console.log("Connection to DB failed");
  }

  // Logging that the server is running and listening to the specified port
  console.log("Listening on port 5100");
});
