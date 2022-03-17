import jwt from "jsonwebtoken";

const generateToken = (infoUser) => {
  return jwt.sign({ infoUser }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
};

export default generateToken;
