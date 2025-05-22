const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../Models/User.modal");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res
          .status(400)
          .send({ success: false, message: "error in hashing password" });
      }
      else{
        const user = new User({name,email,password});
        await user.save();
        res.status(201).send({success:true,message:"User saved successfully"})
      }
    });
  } catch (error) {
    console.log(error.message,"error in registering the user")
    res.status(500).send({success:false,message:"internal server error"})
  }
};


const loginUser = async(req,res)=>{

}
module.exports = {
    registerUser,loginUser
}