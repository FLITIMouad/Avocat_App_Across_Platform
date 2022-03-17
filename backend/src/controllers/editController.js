import async_handler from "express-async-handler";
import EditM from "../models/editModel.js";



export const addEdit = async_handler(async (object) => {

  const edit = new EditM(object);
  const editCreated = await edit.save();

})

