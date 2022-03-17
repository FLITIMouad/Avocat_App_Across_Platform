import mongoose from "mongoose";

const levelSchema = mongoose.Schema(
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


const Level= mongoose.model("Level",levelSchema);
export default Level;