
import async_handler from "express-async-handler";
// import browserInfo  from "browser-info";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



dotenv.config();

//@desc Authentication user & get token
//@Action POST /api/users/login
//@access Public
export const authUser = async_handler(async (req, res) => {

    const { email, password } = req.body;
 
 
    const user = await User.findOne({email});
 
    if (user && (await user.matchPassword(password)) ) {
    //   const browser=browserInfo(req.headers['user-agent']);
      const Token=generateToken({id:user._id,name:user.name });
     
  
      res.json({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        token: Token,
      });
      
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  