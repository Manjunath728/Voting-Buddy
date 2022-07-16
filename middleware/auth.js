const jwt=require("jsonwebtoken")
const Administrator = require("../models/Administrator")
const ErrorResponce=require("../utils/errorResponce")


exports.protect=async(req,res ,next)=>{
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
        const administrator=await Administrator.findById(decoded.id);
        if(!administrator){
            return next(new ErrorResponce("no user found with this id",404))
        }

        req.administrator=administrator

        next()
    } catch (error) {
        return next(new ErrorResponce("not authorized to hi acess this route",401))
    }
}