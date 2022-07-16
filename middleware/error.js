const ErrorResponce = require("../utils/errorResponce");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
 
  if (err.code === 11000) {
    const message = `duplicate Filed value enter`;
    error = new ErrorResponce(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponce(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || "server error" });
};
module.exports=errorHandler