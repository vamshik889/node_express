const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");
      console.log("decoded", decoded);
      if (decoded) {
        next();
      } else {
        res.send({ message: "please login" });
      }
    } catch (error) {
      res.send({ error: error.message });
    }
  } else {
    res.status(400).send({ message: "please login with token" });
  }
};

module.exports = {
  auth,
};
