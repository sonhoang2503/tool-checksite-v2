const mongoose = require('mongoose');

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log('DB connection successful!');
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
