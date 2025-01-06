const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")

const {userModel} = require("../dbConnection/user.Schema");

//register route
userRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error in saving the user data" });
      } else {
        const user = new userModel({ name, email, password: hash, age });
        await user.save();
        res.status(200).send({ message: "User has been save successfully" });
      }
    });
  } catch (error) {
    console.log(error, "user registration failed");
  }
});

//login

userRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email})
        
        if(user){
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                  const token = jwt.sign({ course: "backend" }, "secret");
                  res.status(200).send({ msg: "login successful", token: token });
                } else {
                  res.status(200).send({ msg: "wrong credentials" });
                }
              });
        }
        else{
            res.status(400).send({message:"user not found"})
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message })
    }

})



module.exports ={
    userRouter
}