const mongoose = require("mongoose");
require("dotenv").config()

const dBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

  

module.exports = {
    dBconnection
}