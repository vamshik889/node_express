const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  city: String,
}); // this reference for document

const Studentmodel = mongoose.model("student", studentSchema);
//student is our collection

const main = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/college");
    console.log("connected to database");
    await Studentmodel.insertMany([
      { name: "goku", city: "hyderabad", phone: "344545" },
    ]);
  } catch (error) {
    console.log("error connecting to db");
    console.log(error);
  }
};

main();
