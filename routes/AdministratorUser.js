const express=require("express");
const { getAdministrator, createElection, GetElection, GetResults, Getprice } = require("../controllers/AdministratorUser");
const { protect } = require("../middleware/auth");
const router=express.Router()

router.route("/").get(protect, getAdministrator);
router.route("/electioncreate").post(protect,createElection)
router.route("/getelection").post(protect,GetElection)
router.route("/getresults").post(protect,GetResults)
router.route("/getprice").get(Getprice)

module.exports=router

