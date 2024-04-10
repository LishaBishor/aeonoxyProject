const express= require ('express');
const router= express.Router();
//const Resend= require('resend')
require('dotenv').config();
const API_KEY = process.env.RESEND_API_KEY;
const API_URL = process.env.RESEND_API_URL;
//const resend = new Resend(key);
const axios = require('axios');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());const studentData=require('../Model/studentdata');

async function generateEmail(email) {
    try {
        // Request configuration
        const config = {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        };

        // Example payload for generating an email
        const payload = {
            "from": "kaverdas6873@gmail.com",
            "to": email,
            "subject": "Registration",
            "text": "You are succesfully Registerd "
        };

        // Make a POST request to the resend.com API to generate an email
        const response = await axios.post(`${API_URL}/email`, payload, config);

        // Handle response
        console.log("Email generated successfully:", response.data);
    } catch (error) {
        // Handle error
        console.error("Error generating email:", error.response ? error.response.data : error.message);
    }
}


// to register(signup) the learner
router.post('/register',async(req,res)=>{  
    try {
              
              const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;                       
              const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
         
    if (!emailRegex.test(req.body.email))
    {console.log("invalid email")}
    else  if (!passwordRegex.test(req.body.password))
    {console.log("Enter a Strong password")}
    else
   {const item=req.body;
        const emailexist= await studentData.findOne({email:req.bodyemail})
        if(emailexist){res.send("This mail id is alredy exist ,enter another one")}
        else{
         newitem=new studentData(item);
         const savedata= await newitem.save();
         console.log(savedata)
        res.status(200).json('post successful')
        generateEmail(req.body.email);
        console.log("email sent")
        }
    } 
    
    
}
    catch (error) {
        console.log("failed")
        res.status(400).json("nopost");
     }
 })


//to create or update profile for a registered learner  
router.put('/profile/:id',(req,res)=>{
    try {
       let id=req.params.id;
       mail=req.body.email
       //let token=req.params.token;
      updateddata=req.body
     // jwt.verify(token,"sky",(error,decoded)=>{
        registered=studentData.findById(mail)
        if (registered) {
             studentData.findByIdAndUpdate(id,updateddata).exec()
            console.log('updated')
            res.json({message:"updated"})  
        } else {
            res.json({message:"Not a registered  user"})
        }
   //   })
     
       } catch (error) {
        res.json("Unable to Update "+error); 
   }
})

//... to view profile of the learner
router.get('/viewprofile/:email', async(req,res)=>{
    mail=req.params.email
    const data= await studentData.findOne({"email":mail});
    
    try{
        if(data)
        {
                res.json(data)
            
          }  else{
                res.json({message:"Unable to find "})
            }
        }
       
    catch(error){
        res.status(400).json("cannot get, Error:"+ error);
    }
})



 module.exports=router;
