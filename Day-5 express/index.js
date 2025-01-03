const express = require("express");
const { watchMan, logger } = require("./middleware.js");

const app = express();

// app.use((req, res, next) => {
//   console.log("hello from middleware");
//   next();
//   console.log("bye from middle ware");

// });

// app.use((req, res, next) => {
//   if (true) { //authentication
//     res.send("BYE");
//   } else { // authentication full
//     next();
//   }
// });

// app.use((req, res, next) => {
//   const startTime = new Date().getTime();
//   next();
//   const endTime = new Date().getTime();
//   console.log(endTime - startTime); //milliseconds
// });

// app.use(logger);

// app.get("/", (req, res) => {
//   console.log("hello from base route");
//   res.send("welcome");
// });

// app.get("/about", (req, res) => {
//   console.log("hello from about route");
//   res.send("About");
// });

// app.get("/blog", (req, res) => {
//   console.log("hello from blog route");
//   res.send("Blog");
// });

app.use((req, res, next) => {
  console.log("1");
  next();
  console.log("2");
});

app.use((req, res, next) => {
  console.log("3");
  next();
  console.log("4");
});

app.get("/", (req, res) => {
  console.log("Home");
  res.send("Welcome");
});

app.listen("4676", () => {
  console.log("running on 4676");
});

express.json(); //to parse the data
