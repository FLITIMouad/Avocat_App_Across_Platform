import mongoose from "mongoose";

const caseSchema = mongoose.Schema(
  {
    NumDC: {
      type: String,
      required: true,
      unique: true,
    },
    nameConcure: {
      type: String,
      required: true,
    },
    typeofcase:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"TypeOfCase"
    }
    ,
    client: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref:"Client"
    },
    dateArch: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Case =mongoose.model("Case",caseSchema);
export default Case;