exports.getAdministrator=(req,res,next)=>{
    res.status(200).json({sucess:true,admin:res.administrator})
}