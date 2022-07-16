const { findOne } = require("../models/Administrator");
const Administrator = require("../models/Administrator");
const ErrorResponce = require("../utils/errorResponce");

exports.register = async (req, res, next) => {
  const { name, email, password, organizationName } = req.body;
  try {
    const administrator = await Administrator.create({
      name,
      email,
      password,
      organizationName,
    });

    sendToken(administrator,201,res)
  } catch (error) {
    next(error)
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
   return next(new ErrorResponce("please provide both email and password",400))
  }

  try {
    const administrator = await Administrator.findOne({ email }).select("+password");

    if (!administrator) {
      return next(new ErrorResponce("Invalid email and password",401))
    }

    const isMatch = await administrator.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponce("Invalid email and password",401))
    }
    sendToken(administrator,200,res)
  } catch (error) { res
    .status(500)
    .json({ sucess: false, error:error.message });}
};


const sendToken=(administrator,statusCode,res)=>{
  const token=administrator.getSignedToken()
  res.status(statusCode).json({sucess:true,token})
}