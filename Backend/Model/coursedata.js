const mongoose=require('mongoose');
const courseSchema=mongoose.Schema({
    courseid:String,
    coursename:String,
    category:String,
    duration:String,
    poularity:Number,
    enroledstuds:[String],
    learners:Number    
});
const coursedata=mongoose.model('course',courseSchema);
module.exports= coursedata;