import mongoose from "mongoose";
import dotenv from "dotenv";
import Colors from "colors";
// import users from "./data/users.js";
import User from "./models/userModel.js";
// import Client from "./models/clientModel.js";
// import client from "./data/client.js";
import connectDb from "./config/db.js";
// import TypeOfCase from "./models/typeofcaseModel.js";
// import TypeOfcase from "./data/TypeOfCase.js";
// import Level from "./models/levelModel.js";
// import levelD from "./data/levelD.js";
// import RelationLevel from "./models/relationlevelModel.js";
// // import levelR from "./data/relationLevel.js";
import getMAC from "getmac";
dotenv.config();
connectDb();
const importdata = async () => {
  try {
   
   console.log(getMAC());
    console.log("data Imported".green.inverse);
    process.exit();
  } catch (e) {
    console.log(`Error is : ${e.message}`.red.inverse);
    process.exit();
  }
};

const Destroydata = async () => {
  try {
    await User.deleteMany();
    console.log("data Destroyed!".red.inverse);
    process.exit();
  } catch (e) {
    console.log(`Error is : ${e.message}`.red.inverse);
    process.exit();
  }
};

if (process.argv[2] == "-d") {
  Destroydata();
} else {
  importdata();
}
