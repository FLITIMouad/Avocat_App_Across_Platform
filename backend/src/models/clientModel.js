import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    cin: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    tel1: {
      type: String,
      required: true,
    },
    tel2: {
      type: String,
      required: false,
    },
    tel3: {
      type: String,
      required: false,
    }, 
    email: {
      type: String,
      required: false,
    }, 
    dateArch: {
      type: Date,
      required: false,
    }, 
    physiqueClient: {
      type: Boolean,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client =mongoose.model("Client",clientSchema);
export default Client;