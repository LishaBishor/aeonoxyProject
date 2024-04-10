const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors')
const app=new express();
require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());
require("./db/dbconnect");
const studapi=require('./routes/studregroute');
const courseapi=require('./routes/courseroute');
const enrolapi=require('./routes/enrolment')
const loginapi=require('./routes/loginrouter')
app.use('/api',studapi);
app.use('/api',courseapi);
app.use('/api',enrolapi);
app.use('/api',loginapi)
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`The server is running at PORT ${PORT}`)

})