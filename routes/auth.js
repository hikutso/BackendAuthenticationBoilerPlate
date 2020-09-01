const express=require('express')
const router=express.Router()
const User =require("../models/user")
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config/keys")
const requireLogin=require("../middleware/requireLogin")
 

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello bro")
})

router.post('/signup',(req,res)=>{
    const {name, email, password}=req.body
    if(!email || !password || ! name){
        res.json({error:"please add all the fields"})
        console.log("please add all the fieds")
    }
    User.findOne({email:email}).then((result)=>{
        if(result){
            res.json({message:"already registered"})
        }
         bcrypt.hash(password,10).then((hashpassword)=>{
            const user=new User({
                email,
                name,
                password:hashpassword
            })
            user.save().then((user)=>{
                res.json({message:"successfful saved"})
            }).catch((err)=>{
                console.log(err)
            })
         })

       
    }).catch((err)=>{
        console.log(err)
    })


})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
              
               res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router