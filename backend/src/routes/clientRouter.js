import express from "express";
import { getAllclient,getClientByid,addClient, EditClient }from "../controllers/clientController.js"
import { protect } from "../Middleware/authMiddlewares.js";
const Router=express.Router();

Router.route("/").get(protect,getAllclient);
Router.route("/:id").get(protect,getClientByid);
Router.route("/create").post(protect,addClient)
Router.route("/edit").put(protect,EditClient)

export default Router;