const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const ErrorResponce = require("../utils/errorResponce")

const AdminSchema=new mongoose.Schema({
    userName:String,
    password:{type:String,select:false},
    pricePerVoter:Number
})  
AdminSchema.methods.getSignedToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
const Admin =mongoose.model("Admin",AdminSchema)

module.exports=Admin;