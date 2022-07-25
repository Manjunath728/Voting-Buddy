const Administrator = require("../models/Administrator");
const { findById } = require("../models/Administrator");
const Election = require("../models/Election");
exports.getAdministrator = (req, res, next) => {
  res.status(200).json({ sucess: true, admin: req.administrator });
};
exports.createElection = async (req, res, next) => {
  const { details, ballots, candidates, voter, payment } = req.body;
  try {
    const election = await Election.create({
      details,
      ballots,
      candidates,
      voter,
      payment,
    });
    const administrator = await  Administrator.findByIdAndUpdate(req.administrator._id,
      {

      $push:{
        election:election._id
      }
    })
    
    res.status(200).json({sucess:true,message:"created election sucessfully"})
  } catch (error) {
console.log(error);
    next(error)
   
  }
};
