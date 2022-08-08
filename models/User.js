const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const ErrorResponce = require("../utils/errorResponce")
const UserSchema=new mongoose.Schema({
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
    phoneNumber:{
        type:Number,
        required:[true,"please provide phone Number"],
        unique:true,
    },
    adharNumber:{
        type:Number,
        required:[true,"please provide adhar Number"],
        unique:true,
    },
    election:[{type:mongoose.Schema.Types.ObjectId,ref:"Election"}]
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()})
UserSchema.pre("save",async function(next){
        try {
            const user=await User.findOne({email:this.email})
            if(user){
                next(new ErrorResponce("email already exits ",400))
            }else{
                next()
            }
    
        } catch (err) {
            next(err)
        }
})
UserSchema.pre("save",async function(next){
    try {
        const user=await User.findOne({phoneNumber:this.phoneNumber})
        if(user){
            next(new ErrorResponce("phoneNumber already exits ",400))
        }else{
            next()
        }

    } catch (err) {
        next(err)
    }
})
UserSchema.pre("save",async function(next){
    try {
        const user=await User.findOne({adharNumber:this.adharNumber})
        if(user){
            next(new ErrorResponce("adharNumber already exits ",400))
        }else{
            next()
        }

    } catch (err) {
        next(err)
    }
})
UserSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.getSignedToken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}
const User =mongoose.model("User",UserSchema)

module.exports=User;