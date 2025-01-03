// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((request, res) => {
//   if (request.url === "/") {
//     res.setHeader("Content-Type", "text/html");
//     res.end("<h1>Hello guys!!</h1>");
//   } else if (request.url === "/data") {
//     fs.readFile("./text.txt", "utf-8", (err, data) => {
//       if (err) {
//         res.write("no data \n");
//         res.end(err);
//       } else {
//         res.end(data);
//       }
//     });
//   } else if (request.url === "/adddata" && request.method === "POST") {
//     //some logic to get the payload sent by client;
//     let str = "";
//     request.on("data", (chunk) => {
//       str += chunk;
//     });
//     request.on("end", () => {
//       console.log(str);
//     });
//     res.end("data has been sent");
//   } else {
//     res.end("invalid end point");
//   }
// });

// server.listen("5690", () => {
//   console.log("listening on the port 5690");
// });

//express
const express = require("express");
const fs = require("fs");

const app = express();

//this is middleware
app.use(express.json()); //this will parse the data in the req.body and you will be able to get it as
// well and console.log() if needed

//get, post, put, patch, delete

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.post("/adddetails", (req, res) => {
//   console.log(req.body); // still this will give undefined
//   res.send("data has been accepted");
// });

// app.get("/details", (req, res) => {
//   res.send("all details so far...");
// });

// app.listen("7800", () => {
//   console.log("running on port 7800");
// });

app.get("/students", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  console.log(data.students);
  res.json(data.students);
});

app.post("/addstudents", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  data.students.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send("data has been added");
});

app.delete("");
app.listen("7800", () => {
  console.log("running on port 7800");
});
