const express=require("express");
const { getUser, getElection, postVoteFromUser, GetResults } = require("../controllers/UserVote");
const { Userprotect } = require("../middleware/userAuth");

const router=express.Router()

router.route("/").get(Userprotect, getUser);
router.route("/getelection").post(Userprotect, getElection);
router.route("/postvote").post(Userprotect, postVoteFromUser);
router.route("/getresults").post(Userprotect, GetResults);


module.exports=router

