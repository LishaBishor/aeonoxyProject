const express= require ('express');
const router= express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const studentData=require('../Model/studentdata');
const courseData=require('../Model/coursedata');
const jwt=require('jsonwebtoken')

// api for enrolling the students.No students can enroll for the scourse they already enrolled.
router.put('/enrol/:id/:token',async(req,res)=>{
    try {
       let studid=req.params.id;
    //   let token=req.params.token;
         let courseid=req.body.courseid;
         let email=req.body.email;

   
       
      let enrolled=[String];
      let exist=false
      const student=await studentData.findOne({email:email})
      jwt.verify(req.params.token,"aeonoxy",(error,decoded)=>{
        if(decoded && decoded.email){
      if (student.enrolled.includes(courseid)) {
        res.status(400).json({ message: 'Student is already enrolled in the course.' });
    }
      else{   courseData.findOneAndUpdate({courseid:courseid},
                 {$push:{ enroledstuds:studid}}).exec();
                 studentData.findOneAndUpdate({email:email},
                     {$push:{ enrolled:courseid}}).exec();
                     console.log('enroled')
                    console.log(studid)
                    res.json({message:"enroled"})  
               }
      
   
        // else {
            //     res.json({message:"unauthorised user"})
            // }
          // })
            } 
            else{ res.json({message:"Unauthorised user"})}
        })
            
         
         } catch (error) {
           res.json("Unable to create profile "+error); 
       }
    
     })

     // students to view the courses they enrolle
    
     router.get('/enrolledcourses/:id', async(req,res)=>{
        let id=req.params.id
        const student=await studentData.findById(id)
       try{
                          
  (student.enrolled).forEach(element => {
    console.log(element)
    setTimeout(() => { 
 var course=courseData.findOne({courseid:element}).exec
    },500)

   console.log(course.coursename)
   {res.send(course.coursename)}
    

   });
                   
                
            
           
         }catch(error){
             res.status(400).json("cannot get, Error:"+ error);
         }
    })
    









module.exports=router;

