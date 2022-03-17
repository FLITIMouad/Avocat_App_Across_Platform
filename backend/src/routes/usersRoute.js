import express from "express";
import async_handler from "express-async-handler";
import { authUser } from "../controllers/userController.js";
const Router=express.Router();

Router.post("/login",authUser)

export default Router