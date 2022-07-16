const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

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

    }
})

AdministratorSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
AdministratorSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password)
}

const Administrator =mongoose.model("Administrator",AdministratorSchema)

module.exports=Administrator;