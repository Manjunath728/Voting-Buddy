const { findOne } = require("../models/Administrator");
const User = require("../models/User");
const ErrorResponce = require("../utils/errorResponce");

exports.Userregister = async (req, res, next) => {
  const { name, email, password ,phoneNumber,adharNumber} = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      adharNumber
    });
    
    sendToken(user,201,res)
  } catch (error) {
    next(error)
  }
};
exports.Userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
   return next(new ErrorResponce("please provide both email and password",400))
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponce("Invalid email and password",401))
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponce("Invalid email and password",401))
    }
    sendToken(user,200,res)
  } catch (error) { res
    .status(500)
    .json({ sucess: false, error:error.message });}
};


const sendToken=(user,statusCode,res)=>{
  const token=user.getSignedToken()
  res.status(statusCode).json({sucess:true,token})
}