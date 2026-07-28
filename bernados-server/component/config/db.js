const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) return;

    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables");
      return; 
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    // Do not throw here if you want the API to try again on next request
  }
};

module.exports = connectDB;