require('dotenv').config();
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
    await mongoose.connect("mongodb+srv://vascottosimone:iKFQdBdvIlEiTxn9@setdb.p4zvp.mongodb.net", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });; // Local MongoDB URI
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
