const express = require("express");
const bcrypt = require("bcrypt");
const {usersModel} = require("../model/Usermodel");
const jwt = require("jsonwebtoken")

const UserRouter = express.Router();

//registration

UserRouter.post("/register", async (req, res) => {
  const { email, age, password,name } = req.body;

  try {
    bcrypt.hash(password, 7, async function (err, hash) {
      if (err) {
        res.status(400);
        console.log(err, "error in hashing");
      } else {
        const user = new usersModel({ email, age, password: hash ,name });
        await user.save();
        res.status(200).send({message:"new user has been created successfully"})
      }
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  //login

  UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await usersModel.findOne({ email });

      if (user) {
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({course:"backend"},"secret");
                res.status(200).send({message:"login successful",token:token})
            }
            else{
                res.status(200).send({ msg: "wrong credentials" });
            }
        });
      } else {
        res.status(200).send({ msg: "wrong credentials" });
      }
    } catch (error) {
        console.log(error);
        res.status(400).send({message:"no user found with the email address"})
    }
  });
});

module.exports = {
  UserRouter,
};
