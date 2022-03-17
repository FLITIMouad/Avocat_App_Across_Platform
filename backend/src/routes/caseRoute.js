import express from "express";
import { GetAddCases, GetAddLevelCases, GetAllcases, GetCasesByTl, GetClientCases } from "../controllers/caseController.js";
import {getlevelcase, getTypecase  } from "../controllers/supcaseController.js";
import { protect } from "../Middleware/authMiddlewares.js";

const Router=express.Router();
Router.route("/").get(protect,GetAllcases);
Router.route("/type/:idtl").get(protect,GetCasesByTl);
Router.route("/client/:idcl").get(protect,GetClientCases);
Router.route("/create").post(protect,GetAddCases);
Router.route("/level/create").post(protect,GetAddLevelCases);




Router.route("/type/:typeOf").get(protect,getTypecase)
Router.route("/level").get(protect,getlevelcase)

export default Router
