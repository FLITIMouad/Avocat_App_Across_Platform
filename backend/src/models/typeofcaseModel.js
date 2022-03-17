import mongoose from "mongoose";

const typeofcaseSchema = mongoose.Schema(
  {
    libelle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const TypeOfCase= mongoose.model("TypeOfCase",typeofcaseSchema);
export default TypeOfCase;