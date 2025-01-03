// Importing the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Defining the user schema using mongoose.Schema
// This schema defines the structure of documents in the 'users' collection
const userSchema = mongoose.Schema({
  // 'name' field, which is a required string
  name: {
    type: String,     // Specifies that 'name' should be a string
    required: true,   // This field is mandatory, cannot be null or undefined
  },
  
  // 'age' field, which is a required number
  age: {
    type: Number,     // Specifies that 'age' should be a number
    required: true,   // This field is mandatory, cannot be null or undefined
  },
  
  // 'course' field, which is an optional string
  course: {
    type: String,     // Specifies that 'course' should be a string
    required: false,  // This field is optional, can be left undefined
  },
});

// Creating a model based on the schema defined above
// The first argument is the name of the collection in MongoDB ('users'), which will be automatically pluralized to 'users'
// The second argument is the schema that defines the structure of documents in the collection
const UserModel = mongoose.model("user", userSchema);

// Exporting the UserModel and the schema for use in other parts of the application
// The UserModel will be used to interact with the 'users' collection in MongoDB
module.exports = {
  UserModel, // The model used to create, retrieve, update, and delete users
  userSchema, // The schema itself, which can be used for validation and structure reference
};
