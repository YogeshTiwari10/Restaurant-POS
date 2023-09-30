const mongoose = require("mongoose");

//connecDB Function

const connectDb = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://uic17bca1185:learner@cluster0.bkhlqwr.mongodb.net/?retryWrites=true&w=majority");
      console.log(`MongoDB Connected ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error : ${error.message}`);
      process.exit(1);
    }
  };
  
  //export
  module.exports = connectDb;