const Election = require("../models/Election");
exports.getUser = (req, res, next) => {
  res.status(200).json({ sucess: true, user: req.user });
};
exports.getElection = (req, res, next) => {
  const { id } = req.body;
  try {
    const ele = req.user.election.filter((x) => x._id == id)[0];
    
    
    if (ele) {
      if(ele.details.securityType==="Private"){
        const StartTime = new Date(ele.details.electionStartAt);
        const PresentTime = new Date();
        const EndTime = new Date(ele.details.electionEndAt);
        var eleStatus;
        var voted;
        if (StartTime > PresentTime) {
          eleStatus = "notStarted";
        } else if (StartTime < PresentTime && EndTime > PresentTime) {
          for (var i = 0; i < ele.voter.length; i++) {
            if (ele.voter[i].isVoted === true) {
              voted = true;
            } else {
              voted = false;
              break;
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
        const VotingStatus = ele.voter.filter(
          (item) => item.email === req.user.email
        )[0].isVoted;
        res.status(200).json({
          sucess: true,
          message: "fetched  election sucessfull ",
          election: ele,
          eletionStatus: eleStatus,
          VotingStatus,
        });
      }else{
        const StartTime = new Date(ele.details.electionStartAt);
      const PresentTime = new Date();
      const EndTime = new Date(ele.details.electionEndAt);
      var eleStatus;
      var voted;
      if (StartTime > PresentTime) {
        eleStatus = "notStarted";
      } else if (StartTime < PresentTime && EndTime > PresentTime) {
        if(ele.payment.maxVoter===ele.voter.length){
          eleStatus = "Completed";
        }else{
          eleStatus = "Live";
        }
        
      } else {
        eleStatus = "Completed";
      }
      const found = ele.voter.filter(
        (item) => item.email === req.user.email
      )[0]
        var VotingStatus
      if(!found){
       VotingStatus=false
      }else{
      VotingStatus=true
      }

      res.status(200).json({
        sucess: true,
        message: "fetched  election sucessfull ",
        election: ele,
        eletionStatus: eleStatus,
        VotingStatus,
      });
      }
      
    } else {
      res.status(400).json({ sucess: false, message: "no ele found" });
    }
  } catch (error) {}
};
exports.postVoteFromUser = async (req, res, next) => {
  const { forVoted, eleId,uniqueKey } = req.body;

  
    try {
      const election = await Election.findById(eleId);
      if (!election) {
        res.status(400).json({ sucess: false, message: "no ele found" });
      }
      const StartTime = new Date(election.details.electionStartAt);
      const PresentTime = new Date();
      const EndTime = new Date(election.details.electionEndAt);
      if(election.details.securityType==="Private"){
        if(!uniqueKey){
          res.status(400).json({ sucess: false, message: "uniqueKey cannot be empty" });
        }
      if (StartTime > PresentTime) {
        res.status(400).json({ sucess: false, message: " election is not started" });
      } else if (StartTime < PresentTime && EndTime > PresentTime) {
        election.voter.forEach(async (voterList) => {
          if (voterList.email === req.user.email) {
            if (!voterList.isVoted) {
              if(voterList.uniqueKey===uniqueKey){
                Election.updateOne(
                  { "_id":eleId, "voter.email": voterList.email },
                  { $set: { "voter.$.isVoted": true } },
                  function (err, result) {
                    if (err) {
                      console.log(err);
                    } else if (!result) {
                      //update not success
                    } else {
                      //update success
                    }
                  }
                );
                forVoted.forEach((name) => {
                  Election.findOneAndUpdate(
                    { eleId, "candidates.candidateName": name },
                    { $inc: { "candidates.$.votes": 1 } },
                    function (err, result) {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                });
                res.status(201).json({ sucess: true, message: "Voted Sucesfully" });
              }else{
                res.status(400).json({ sucess: false, message: "invalid unique key" });
              }
              
            } else {
              res.status(400).json({ sucess: false, message: "alredy voted" });
            }
          }
        })
      } else {
        res.status(400).json({ sucess: false, message: " election is over" });
      }}else{
        if (StartTime > PresentTime) {
          res.status(400).json({ sucess: false, message: " election is not started" });
        } else if (StartTime < PresentTime && EndTime > PresentTime) {
          var check
          for(let i=0;i<election.voter.length;i++){
            if (election.voter[i].email === req.user.email) {
              check=true
              break
            }
          }
          if(check){
            res.status(400).json({ sucess: false, message: "alredy voted" });
          }else{
            var checkMaxVoter
            if(election.voter.length===election.payment.maxVoter){
              res.status(400).json({ sucess: false, message: "election completed :maxvoter reached " });
            }else{
              Election.findById(election._id ,function (err,FoundElection){
                if(err){
                  console.log(err);
                }else{
                  FoundElection.voter=[...FoundElection.voter,{email:req.user.email}]
                  FoundElection.save()
                }
              })
              forVoted.forEach((name) => {
                Election.findOneAndUpdate(
                  { eleId, "candidates.candidateName": name },
                  { $inc: { "candidates.$.votes": 1 } },
                  function (err, result) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              })
              res.status(201).json({ sucess: true, message: "Voted Sucesfully" });
            }
            

          }
          
        } else {
          res.status(400).json({ sucess: false, message: " election is over" });
        }
      }
      
    } catch (error) {}
  
};
exports.GetResults = async (req, res, next) => {
  const { electionId } = req.body;
  const ele = await Election.findById(electionId);
  
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
          console.log("completed");
          voted = true;
        }else{
          console.log(ele.voter.length)
          console.log("not");

          voted = false;
        }
      }
      if (voted) {
        eleStatus = "Completed";
      } else {
        eleStatus = "Live";
      }
      if (voted) {
        if(ele.details.voterAcessType){
          res
          .status(200)
          .json({ sucess: true, results:FunctionToGetResult() })
        }else{
          res.status(400).json({
            sucess: false,
            message: "you dont have acess to  result ",
          });
        }
        
      } else {
        
        res.status(400).json({
          sucess: false,
          message: "election is Live .you dont have acess to live result wait for completion of election",
        });
          
        
      }
    } else {
      if(ele.details.voterAcessType){
        res
        .status(200)
        .json({ sucess: true, results:FunctionToGetResult() })
      }else{
        res.status(400).json({
          sucess: false,
          message: "you dont have acess to  result ",
        });
      }
    }
  } else {
    res.status(400).json({ sucess: false, message: "no ele found" });
  }
};
