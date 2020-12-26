//Models folder is used for making collection/table for oue student database
const mongoose=require("mongoose");
const studentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:{type:String,require:true},//if we use require:true then it will not take any null values
    lastname:{type:String,require:true},
    place:{type:String,require:true}
})

module.exports=mongoose.model("Student",studentSchema)