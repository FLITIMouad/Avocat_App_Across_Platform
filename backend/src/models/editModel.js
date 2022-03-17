import mongoose from "mongoose";

const editeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      Element: {
        type: String,
      required: true,
    },
    ActionEdit: {
        type: String,
      required: true,
    },  
    TypeElement: {
        type: String,
      required: true,
    },
},
{
    timestamps: true,
  }
)
const EditM = mongoose.model("EditM", editeSchema);
export default EditM;
