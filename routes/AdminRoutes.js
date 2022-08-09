const express = require("express")
const {AdminAuth}=require("../middleware/AdminAuth")
const { login, getAdminData, getElectionData, getAdministartorData, updatePrice } = require("../controllers/AdminRoutes")

const router=express.Router()

router.route("/login").post(login)

router.route("/").get(AdminAuth, getAdminData)
router.route("/getelection").get(AdminAuth, getElectionData)
router.route("/getadministrator").get(AdminAuth, getAdministartorData)
router.route("/updatePrice").post(AdminAuth, updatePrice)
router.route("/get").post(AdminAuth, updatePrice)


module.exports=router