const express=require("express");
const { getAdministrator, createElection, GetElection } = require("../controllers/AdministratorUser");
const { protect } = require("../middleware/auth");
const router=express.Router()

router.route("/").get(protect, getAdministrator);
router.route("/electioncreate").post(protect,createElection)
router.route("/getelection").get(protect,GetElection)

module.exports=router

