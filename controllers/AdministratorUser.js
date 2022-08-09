const Admin = require("../models/Admin");
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
    const administrator = await Administrator.findByIdAndUpdate(
      req.administrator._id,
      {
        $push: {
          election: election._id,
        },
      }
    );

    res
      .status(200)
      .json({ sucess: true, message: "created election sucessfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.GetElection = async (req, res, next) => {
  const { id } = req.body;

  try {
    
    const ele = req.administrator.election.filter((x) => x._id == id)[0];
    if (ele) {
      const StartTime = new Date(ele.details.electionStartAt);
      const PresentTime = new Date();
      const EndTime = new Date(ele.details.electionEndAt);
      var eleStatus;
      var voted;
      
      if (StartTime > PresentTime) {
        eleStatus = "notStarted";
      } else if (StartTime < PresentTime && EndTime > PresentTime) {
        if (ele.details.securityType==="Private") {
          for (var i = 0; i < ele.voter.length; i++) {
            if (ele.voter[i].isVoted === true) {
              voted = true;
            } else {
              voted = false;
              break;
            }
          }
        }else{
          if( ele.voter.length===ele.payment.maxVoter){
            
            voted = true;
          }else{


            voted = false;
          }
        }
        if (voted) {
          eleStatus = "Completed";
        } else {
          eleStatus = "Live";
        }
      } else {
        eleStatus = "Completed";
      }
      res.status(200).json({
        sucess: true,
        message: "fetched  election sucessfull ",
        election: ele,
        eletionStatus: eleStatus,
      });
    } else {
      res.status(400).json({ sucess: false, message: "no ele found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.GetResults = async (req, res, next) => {
  const { electionId } = req.body;
  const ele = req.administrator.election.filter((x) => x._id == electionId)[0];
  
  const FunctionToGetResult=()=>{
    let votesArray = [];
    ele.candidates.forEach((can) => {
      votesArray.push({
        candidateName: can.candidateName,
        votes: can.votes,
      });
    });
    var winner = votesArray.reduce(function (prev, current) {
      if (+current.votes > +prev.votes) {
        return current;
      } else {
        return prev;
      }
    });
    const percent =
      (votesArray.reduce((n, { votes }) => n + Number(votes), 0) /
        ele.voter.length) *
      100;
    return({ votesArray, winner, percent })
  }
  if (ele) {
    const StartTime = new Date(ele.details.electionStartAt);
    const PresentTime = new Date();
    const EndTime = new Date(ele.details.electionEndAt);
    var voted;
    if (StartTime > PresentTime) {
      res.status(400).json({
        sucess: false,
        message: " election is  not started",
      });
    } else if (StartTime < PresentTime && EndTime > PresentTime) {
      if (ele.details.securityType==="Private") {
        for (var i = 0; i < ele.voter.length; i++) {
          if (ele.voter[i].isVoted === true) {
            voted = true;
          } else {
            voted = false;
            break;
          }
        }
      }else{
        if( ele.voter.length===ele.payment.maxVoter){
          
          voted = true;
        }else{
          

          voted = false;
        }
      }
      if (voted) {
        eleStatus = "Completed";
      } else {
        eleStatus = "Live";
      }
      if (voted) {
        res
          .status(200)
          .json({ sucess: true, results:FunctionToGetResult() })
      } else {
        if(ele.details.adminAcessType){
          res
          .status(200)
          .json({ sucess: true, results:FunctionToGetResult() })
        }else{
          res.status(400).json({
            sucess: false,
            message: "election is Live .you dont have acess to live result wait for completion of election",
          });
        }
          
        
      }
    } else {
      res
        .status(200)
        .json({ sucess: true, results:FunctionToGetResult() });
    }
  } else {
    res.status(400).json({ sucess: false, message: "no ele found" });
  }
};
exports.Getprice = async (req, res, next) => {
   const price= await Admin.findOne({userName: 'admin'})
  res.status(200).json({ sucess: true, price })
}
