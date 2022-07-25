const express=require("express");
const { getAdministrator, createElection } = require("../controllers/AdministratorUser");
const { protect } = require("../middleware/auth");
const router=express.Router()

router.route("/").get(protect, getAdministrator);
router.route("/electioncreate").post(protect,createElection)

module.exports=router

