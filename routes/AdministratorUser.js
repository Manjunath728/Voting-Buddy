const express=require("express");
const { getAdministrator } = require("../controllers/AdministratorUser");
const { protect } = require("../middleware/auth");
const router=express.Router()

router.route("/").get(protect, getAdministrator);

module.exports=router

