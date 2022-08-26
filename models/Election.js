const mongoose = require("mongoose");
const DetailsSchema = new mongoose.Schema({
  electionTitle: {
    type: String,
    required: [true, "please enter vote title"],
  },
  electionStartAt: {
    type: String,
    required: [true, "please enter when should election start "],
  },
  electionEndAt: {
    type: String,
    required: [true, "please enter when should election End "],
  },
  securityType: {
    type: String,
    required: [true, "please enter security type of your election "],
  },
  adminAcessType: {
    type: Boolean,
    required: [
      true,
      "please enter Admin acess type for results of your election ",
    ],
  },
  voterAcessType: {
    type: Boolean,
    required: [
      true,
      "please enter Voter acess type for results of your election ",
    ],
  },
});
const BallotsSchema = new mongoose.Schema({
  ballotInstruction: {
    type: String,
    required: [true, "please enter ballot instruction  "],
    default: "Your choices are secret ",
  },
  postionName: {
    type: String,
    required: [true, "please position name  "],
  },
  votePerVoter: {
    type: Number,
    default: 1,
    min: [1, "enter atleast 1 vote per voter"],
  },
  electionInstruction: {
    type: String,
    default: "vote aleast one candidatte ",
  },
  nota: {
    type: Boolean,
    default: false,
  },
});
const candiateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: [true, "enter candidate name"],
  },
  candidateManifesto: {
    type: String,
    required: [true, "enter candidate manifesto"],
  },
  candidateImage: {
    type: String,
    required: [true, "enter candidate image"],
  },
  votes:{
    type:Number,
    default:0
  }
});
const voterSchema = new mongoose.Schema({
  
  uniqueKey: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  isVoted:{type:Boolean,default:false}
});

const ElectionSchema = new mongoose.Schema({
  details: {type:DetailsSchema,required:[true,"enter election details corectly"]},
  ballots:{type:BallotsSchema,required:[true,"enter elction ballots details corectly"]} ,
  candidates: [{type:candiateSchema,required:[true,"enter candidate details corectly"]}],
  voter: [{type:voterSchema,required:[true,"enter voter details corectly"]}],
  payment: {
    maxVoter:Number,
    price:Number
  }
});

const Election = mongoose.model("Election", ElectionSchema);


module.exports = Election;
