import mongoose from "mongoose";

const relationlevelSchema= mongoose.Schema({
   
    level:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"Level"
    },
    typeofcase:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"TypeOfCase"
    }
},
{
    timestamps: true,
}
)

const  RelationLevel =mongoose.model("RelationLevel",relationlevelSchema);
export default RelationLevel;