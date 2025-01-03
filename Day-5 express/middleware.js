const fs = require("fs");
const watchMan = (req, res, next) => {
  if (req.url === "/about") {
    next();
  } else {
    res.send("bye");
  }
};

const logger = (req, res, next) => {
  fs.appendFileSync(
    "./logs.txt",
    `\n ${req.method} +${req.url} TIME: ${new Date().getTime()}`,
    "utf-8"
  );
  next();
};

module.exports = { watchMan, logger };
