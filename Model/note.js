
const mongoose= require("mongoose")
 const noteschema=mongoose.Schema({
 
    Title:{
        type :String,
        required:true
    },
    Description:{
         type:String,
         required :true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    }
     


 },{timestamps:true});

 module.exports=mongoose.model("note",noteschema)