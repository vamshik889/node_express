const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");

      if (decoded) {
        next();
      } else {
        res.send({ message: "please login" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "please login with token" });
    }
  } else {
    res.status(400).send({message:"invalid token"})
  }
};

module.exports = {
  auth,
};
