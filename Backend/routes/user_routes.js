//initialize express
const express = require('express');
//initialize express router
const router = express.Router();
//initialize bcrypt 
const bcrypt = require('bcrypt');
//initialize json web token
const jwt=require('jsonwebtoken');

const {JWT_SECRET}=require('../config')
//initiale mongoose
const mongoose = require("mongoose");
const userModel = mongoose.model("userModel");

//post method use to send data in mongodb database
router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: "All fields are mondatory" })
    }
    //find email is already exist or not in database
    userModel.findOne({ email: email })
        .then(userIndb => {
            if (userIndb)
                return res.status(401).json({ error: "email is already exist" });
            //bcrycpt the password
            bcrypt.hash(password,16)
                .then(hashpassword => {
                    const user = new userModel({ firstName, lastName, email, password:hashpassword });
                    user.save()
                        .then(newUser => {
                            res.status(200).json({ result: "user registered successfull" });
                        }).catch(err => console.log(err));

                }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});
//post method use find email and password exist or not in database if exist create jwt token
router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password)
    {
        return res.status(400).json({error:"all fields are mandatory"})
    }
    userModel.findOne({email:email})
    .then((userIndb)=>{
        if(!userIndb){
            return res.status(401).json({error:"Email is not registered!!"})
        }
        else{

            bcrypt.compare(password,userIndb.password)
            .then(didMatch=>{
                if(didMatch){
                    const jwtToken=jwt.sign({_id:userIndb._id},JWT_SECRET);
                    const userInfo={"_id":userIndb._id,"email":userIndb.email,"fullName":userIndb.firstName+userIndb.lastName};
                    res.status(200).json({result:{token:jwtToken,user:userInfo}});
                }
                else{
                    return res.status(401).json({error:"incorrect password!!"});
                }
            }).catch(err=>console.log(err));
        }
    }).catch(err=>console.log(err));

});
module.exports=router;