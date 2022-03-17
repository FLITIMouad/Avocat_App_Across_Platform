import async_handler from "express-async-handler";
import RelationLevel from "../models/relationlevelModel.js";
import TypeOfCase from "../models/typeofcaseModel.js";
import Level from "../models/levelModel.js";


export const getTypecase = async_handler(async (req, res) => {
  const query = req.params.typeOf;

  const result = await(await RelationLevel.where("level", query)
    .select("typeofcase -_id")
    .populate({
      path: "typeofcase",

      select: "libelle ",
    })
    .lean()).flatMap(
        (element) => element.typeofcase
      );;
 
  res.json(result);
});

export const getlevelcase = async_handler(async (req, res) => {
  const query = req.query.typeOf;
  const result = await
   ( await Level.find({}).select("libelle")
   ).flatMap((element) => element);
  res.json(result);
});
