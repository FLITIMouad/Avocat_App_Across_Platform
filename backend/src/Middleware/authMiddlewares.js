import jwt from "jsonwebtoken";
import async_handler from "express-async-handler";
import User from "../models/userModel.js";

const protect = async_handler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.includes("Bearer")) {
    try {
      const tokendecode = jwt.verify(
        token.split(" ")[1],
        process.env.JWT_TOKEN
      );

      const findUser = await User.findById(tokendecode.infoUser.id);
      if (findUser) {
        req.sd = findUser;
      }
    } catch (err) {
      res.status(401);
      throw new Error("No authorized ,no token ");
    }
  } else {
    res.status(401);
    throw new Error("No authorized ,no token  ");
  }

  next();
});

export { protect };
