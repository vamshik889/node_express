const express = require("express");
const bcrypt = require('bcrypt')

const userRouter = express.Router();

const {userModel} = require("../model/usermodel")

userRouter.post("/login",async(req,res)=>{


});

userRouter.post("/register",async(req,res)=>{

    const {name,age,email,password} = req.body;
    console.log(name,age,email,password)

    try {
        bcrypt.hash(password, 10, async function(err, hash) {
                if(err){
                    res.status(400).send({message:"error in hashing password"})
                }
                else{
                    try {
                        const user = new userModel({email,password:hash,name,age});
                    await user.save();
                    res.status(200).send({message:"user saved successfully"})
                    } catch (error) {
                        console.log(error);
                        res.status(400).send({message:"error in saving user to DB"})
                    }
                    
                }
        });
        
    } catch (error) {
        console.log(error);
        res.send({message:"error in hashing",error})
    }


})


module.exports={
    userRouter
}