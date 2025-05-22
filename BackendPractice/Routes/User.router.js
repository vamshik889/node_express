const express = require("express");
const { registerUser, loginUser } = require("../Controllers/userRoute.controller");

const userRoute = express.Router();

//Register User
userRoute.post("/register",registerUser);

userRoute.post("/login",loginUser);


module.exports = {
    userRoute
}