const Admin = require("../models/Admin");
const Administrator = require("../models/Administrator");
const { findOne } = require("../models/Administrator");
const Election = require("../models/Election");
const ErrorResponce = require("../utils/errorResponce");

exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
   return next(new ErrorResponce("please provide both userName and password",400))
  }

  try {
    const admin = await Admin.findOne({ userName }).select("+password")

    if (!admin) {
      return next(new ErrorResponce("Invalid userName and password",401))
    }else if (password!==admin.password) {
      return next(new ErrorResponce("Invalid email and password",401))
    }
    sendToken(admin,200,res)
  } catch (error) { res
    .status(500)
    .json({ sucess: false, error:error.message });}
};
exports.getAdminData = async (req, res, next) => {
    res.status(200).json({sucess:true,admin:req.admin})
}
exports.getAdministartorData = async (req, res, next) => {
    const administartorData=await Administrator.find().populate("election")
    res.status(200).json({sucess:true,administartorData})
}
exports.getElectionData = async (req, res, next) => {
    const electionData=await Election.find()
    res.status(200).json({sucess:true,electionData})
}
exports.updatePrice = async (req, res, next) => {
  const {price}=req.body
  if(!price){
    return next(new ErrorResponce("ivalid",401))
  }
  try {
    const admin=await Admin.findOne({
      userName:"admin"
  
    })
    admin.pricePerVoter=price
    admin.save()
    res.status(200).json({sucess:true,message:`price per voter updated to ${price}/- Rs` })
  } catch (error) {
    res.status(401).json({sucess:true,message:"price not updated"})
  }
  
   
    
    
}
exports.Getprice = async (req, res, next) => {
  const price= await Admin.findOne({userName: 'admin'})
 res.status(200).json({ sucess: true, price })
}


const sendToken=(admin,statusCode,res)=>{
  const token=admin.getSignedToken()
  res.status(statusCode).json({sucess:true,token})
}