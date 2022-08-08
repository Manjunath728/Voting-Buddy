const express = require("express")
const { Userregister, Userlogin } = require("../controllers/UserAuth")

const router=express.Router()



router.route("/register").post(Userregister)

router.route("/login").post(Userlogin)

module.exports=router