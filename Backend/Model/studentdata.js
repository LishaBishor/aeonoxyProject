
const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String,
    studname:String,
    photo:String,
    qualification:String,
    enrolled:[String]
});
const studentdata=mongoose.model('studentdetail',studentSchema);
module.exports= studentdata;