import mongoose from "mongoose";

const levelcaseSschema = mongoose.Schema(
  {
    NumDt: {
      type: String,
      required: true,
      unique: true,
    },
    AdressT: {
      type: String,
      required: false,
    },
    dateCt: {
      type: Date,
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Level",
    },
    NomAvocat: {
      type: String,
      required: false,
    },
    case: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Case",
    },
    dateArch: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const levelcase = mongoose.model("levelcase", levelcaseSschema);
export default levelcase;
