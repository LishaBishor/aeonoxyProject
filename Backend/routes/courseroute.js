const express= require ('express');
const router= express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const courseData=require('../Model/coursedata');
const jwt=require('jsonwebtoken');

// to enter the course details for superadmin
router.post('/postcourse',async(req,res)=>{  
    
    try {
        if (req.body.password=="Superadmin@123")
        {
            jwt.sign({email:username,id:user._id},"sky",{expiresIn:'1d'},
            (error,token)=>{
                if (error) {
                    res.json({message:"Token not generated"})
                }   
                else 
  { const item=req.body;
         newitem=new courseData(item);
         const savedata=  newitem.save();
         console.log(savedata)
        res.status(200).json('post successful')
    }}) 
 }
             
        else{res.json("Only Admin can add the Course Details")}
    
}
    catch (error) {
        console.log("failed")
        res.status(400).json("nopost");
     }
    
    
 })

 //to view courses 
 router.get('/viewcourses', async(req,res)=>{
    const data= await courseData.find();
    try{
        {

                res.json(data)
            }
        
       
    }catch(error){
        res.status(400).json("cannot get, Error:"+ error);
    }
})

// To update courses for super admin
router.put('/updatecourse/:id',(req,res)=>{
    try {
        if (req.body.password=="Superadmin@123"){
       let id=req.params.id;
    //   let token=req.params.token;
      updateddata=req.body
   //   jwt.verify(token,"sky",(error,decoded)=>{
   //     if (decoded && decoded.email) {
             courseData.findByIdAndUpdate(id,updateddata).exec()
            console.log('updated')
            res.json({message:"updated"})  
       // } 
        // else {
        //     res.json({message:"unauthorised user"})
        // }
     // })
        }
        else{res.json("Only Admin can Update the Course Details")}
       } catch (error) {
        res.json("Unable to Update "+error); 
   }
})

//To delete a course for super admin

router.delete('/deletecourse/:id',(req,res)=>{
    
    try{
        if (req.body.password=="Superadmin@123"){
        let id=req.params.id;
        let token=req.params.token;
       // const deleteddata=req.body;
       
        // jwt.verify(token,"sky",(error,decoded)=>{
        //     if (decoded && decoded.email) {
             //   console.log(deleteddata)
           let deldata= courseData.findByIdAndDelete(id).exec();
        res.json({message:'deleted course details sucessfully'})
          //  }
        //      else {
        //         res.json({message:"Unauthorised user",token})
        //     }
        // })
        }
        else{res.json("Only Admin can delete the Course Details")} 
    }catch(error){
        res.json({message:"cannot deleted "+error})
    }
})

// to view courses by category
router.get('/viewcategory/:category', async(req,res)=>{
    category=req.params.category
    const data= await courseData.find({'category':category});
    try{
        {

                res.json(data)
            }
        
       
    }catch(error){
        res.status(400).json("cannot get, Error:"+ error);
    }
})


 module.exports=router;
