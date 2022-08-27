const express=require("express");
const { getAdministrator, createElection, GetElection, GetResults, Getprice, deleteElection, updateElection } = require("../controllers/AdministratorUser");
const { protect } = require("../middleware/auth");
const router=express.Router()
const multer =require("multer")

const storage=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"./client/public/uploads/")
  },
  filename:(req,file,callback)=>{
    callback(null,Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({storage:storage})

router.route("/").get(protect, getAdministrator);
router.route("/electioncreate").post(protect,createElection)
router.route("/electionupdate").post(protect,updateElection)
router.route("/getelection").post(protect,GetElection)
router.route("/getresults").post(protect,GetResults)
router.route("/getprice").get(Getprice)
router.route("/deleteelection").post(protect,deleteElection)

module.exports=router

