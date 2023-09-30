const mongoose = require("mongoose");

//connecDB Function

const connectDb = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI).to;
      console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error : ${error.message}`);
      process.exit(1);
    }
  };
  
  //export
  module.exports = connectDb;