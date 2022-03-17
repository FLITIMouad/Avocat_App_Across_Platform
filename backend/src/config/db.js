import mongoose from "mongoose";
import dotenv from "dotenv";


const connectDb = async () => {
  try {
 
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    

    
    console.log(
      `is connected database :${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDb;