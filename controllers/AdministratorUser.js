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
exports.GetElection= async (req,res,next)=> {
        const {id}=req.body
        try {
          console.log(id);
          const ele=req.administrator.election.filter(x=>x._id==id)[0]
          console.log(req.administrator.election.details);
          const StartTime=new Date(ele.details.electionStartAt)
          const PresentTime=new Date()
          const EndTime=new Date(ele.details.electionEndAt)
          var eleStatus
          if(StartTime>PresentTime){
               eleStatus="notStarted"
          }else if(StartTime<PresentTime&&EndTime>PresentTime){
             eleStatus="Live"
          }else {
             eleStatus="Completed"
          }
          res.status(200).json({sucess:true,message:"fetched  election sucessfull ",election:ele,eletionStatus:eleStatus})
        } catch (error) {
          console.log(error);
    next(error)
   
        }
}