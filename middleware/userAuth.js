const jwt=require("jsonwebtoken")
const Administrator = require("../models/Administrator")
const User = require("../models/User")
const ErrorResponce=require("../utils/errorResponce")


exports.Userprotect=async(req,res ,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // bearer 2652hghf26247652gjhg2hghg2
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new ErrorResponce("not authorized to acess this route",401))
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.id)
        if(!user){
            return next(new ErrorResponce("no user found with this id",404))
        }
        const allAdmin=await Administrator.find().populate("election")
        allAdmin.map(admin=>{
            admin.election.forEach(ele=>{
                
                if(ele.details.securityType==="Public"){
                    User.findByIdAndUpdate(user._id,
                        {
                  
                        $addToSet:{
                          election:ele._id
                        }
                      }).then(()=>{})
                }else{
                    ele.voter.forEach(async voterList=>{
                        if(voterList.email===user.email){
                            User.findByIdAndUpdate(user._id,
                                {
                          
                                $addToSet:{
                                  election:ele._id
                                }
                              }).then()
                        }
                        
                    })
                }
                
            })
        })
        req.user=await User.findById(decoded.id).populate("election")

        next()
    } catch (error) {
        return next(new ErrorResponce("not authorized to hi acess this route",401))
    }
}