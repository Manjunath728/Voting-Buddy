const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const AdministratorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"]

    },
    email:{
        type:String,
        required:[true,"please provide email"],
        unique:true,
        match:[
            /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,"please provide valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"],
        minlength:6,
        select:false

    },
    organizationName:{
        type:String,
        required:[true,"please provide organization name"]

    },
    election:[{type:mongoose.Schema.Types.ObjectId,ref:"Election"}]
})

AdministratorSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()})
AdministratorSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password)
}
AdministratorSchema.methods.getSignedToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
const Administrator =mongoose.model("Administrator",AdministratorSchema)

module.exports=Administrator;