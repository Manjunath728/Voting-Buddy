const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const ErrorResponce = require("../utils/errorResponce")

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
    phoneNumber:{
        type:Number,
        required:[true,"please provide phone Number"],
        unique:[true,"phone number alredy exist"]
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
    next()
    

})
AdministratorSchema.pre("save",async function(next){
    try {
        const user=await Administrator.findOne({email:this.email})
        if(user){
            next(new ErrorResponce("email alredy exits ",400))
        }else{
            next()
        }

    } catch (err) {
        next(err)
    }
})
AdministratorSchema.pre("save",async function(next){
    try {
        const user=await Administrator.findOne({phoneNumber:this.phoneNumber})
        if(user){
            next(new ErrorResponce("phone Number alredy exits ",400))
        }else{
            
        }

    } catch (err) {
        next(err)
    }
})
AdministratorSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password)
}
AdministratorSchema.methods.getSignedToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
const Administrator =mongoose.model("Administrator",AdministratorSchema)

module.exports=Administrator;