const express = require('express')
const cors = require('cors')
const mongoose= require('mongoose')
const dotenv=require('dotenv').config()
const jwt=require('jsonwebtoken')
const User=require('./Models/usermodel.js')
 

const app=express()
app.use(cors())

app.use(express.json());

// mongoose.connect(process.env.MongoURL).then(()=>console.log("Connected to db")).catch((error)=>console.log(error)
// );


// const mongooseUrl=process.env.MongoURL

// mongoose.connect(mongooseUrl,{
// }).then(()=>{console.log("Connected to database");}).catch(er => console.log(er))

mongoose.connect('mongodb://localhost:27017/logincollection')

const port=5000;

app.post ('/api/register',async (req,res) =>{
    console.log(req.body);
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        res.json({status:"okiee"})
    }catch(err){
console.log(err)

        res.json({status:'error',error:'Duplicate email'})
    }
})
app.post ('/api/login',async (req,res) =>{
   
    const user=  await User.findOne({email:req.body.email,password:req.body.password})
   
    if(user){

        const token=jwt.sign({
            name:user.name,
            email:user.email,
        },'secret123')
       return res.json({status:'ok',user:token})
    }else{
        return res.json({status:'error',user:false})
    }
})


app.listen(port,()=>{
    console.log("Listening from port 5000 :}")
})