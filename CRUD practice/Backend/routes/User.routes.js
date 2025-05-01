const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/UserModel");

const userRouter = express.Router();

//register

userRouter.post("/register", (req, res) => {
  console.log(req.body);
  const { email, password, name, age } = req.body;

  try {
    bcrypt.hash(password, 11, async function (err, hash) {
      if (err) {
        res.status(400).send({ message: "error in hashing the password" });
      } else {
        const user = new userModel({ email, password: hash, name, age });
        await user.save();
        res.status(200).send({ message: "User has been saved successfully" });
      }
    });
  } catch (error) {
    console.log(error, "error in registration");
    res.status(400).send({ message: "error in registration" });
  }
});

//login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
        const user = await userModel.findOne({ email });
        if (user) {
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
              res.status(400).send({ message: "please enter correct password" });
            } else {
              const token = jwt.sign(
                { author: user.name, authorId: user.id },
                "secret"
              );
              res
                .status(200)
                .send({ message: "Logged in successfully", token: token });
            }
          });
        } else {
          res
            .status(400)
            .send({ message: "please register to login to the application" });
        }
    } catch (error) {
        res.status(400).send({message:"please enter valid email and password"})
    }

  } else {
    res.status(400).send({ message: "enter valid email and password" });
  }
});


module.exports = {
    userRouter
}