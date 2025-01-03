const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.write("hello");
    response.end("the end of response");
  } else if (request.url === "/reports") {
    response.end("here are the reports");
  } else if (request.url === "/data") {
    fs.readFile("./text.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        response.write("no data \n");
        response.end(err);
      } else {
        response.end(data);
      }
    });
  }
});

server.listen("8070", () => {
  console.log("listening on the port 8080");
});
