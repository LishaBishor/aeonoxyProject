const express= require ('express');
const router= express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const studentData=require('../Model/studentdata');
const jwt=require('jsonwebtoken')

router.post('/login',async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    const user= await studentData.findOne({username:username});
    if(!user){
       res.json({message:"User not found"}) ;
    }
    try {
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"aeonoxy",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"})
                } else {
                    res.json({message:"Login suceesfully",token:token,data:user})
                }
            })
           
        }
        else{
            res.json({message:'Login failed'})
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports=router;