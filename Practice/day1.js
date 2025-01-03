// Import the HTTP module
let http = require("http");

// Create an HTTP server
let server = http.createServer((request, response) => {
    // Check the URL of the incoming request;
    let arr = ["vamshi","krishna","domala","vk","hi","hello","welcome","www","node","express"]
   let random = Math.floor(Math.random()*10);
  
    if (request.url === "/vamshi") {
        // If the URL is "/vamshi", send a response 
        response.write(`Hi ${arr[random]}`);
        response.end(); // End the response
    } else {
        // For all other URLs, send a response with "Invalid end point"
        response.end("Invalid end point");
    }
});

// Start the server and make it listen on port 7666
server.listen("7666", () => {
    // Log a message to the console indicating the server is running
    console.log("listening to the server");
});


//Reading file sync

let fs = require("fs");

let data1 = fs.readFileSync("./text.txt","utf-8");
console.log(data1);

//read file async

fs.readFile("./text.txt","utf-8",(err,respons)=>{
    if(err){
        console.log("error reading the file",err)
    }
    else{
        console.log(respons);
    }
});

//writing to a file async

let msg = "written asynchronously";

fs.writeFile("./text.txt",msg,(err)=>{
    if(err){
        console.log("error in writing file",err)
    }
    else{
        console.log("msg written successfully");
        let cons = fs.readFileSync("./text.txt","utf-8");
        console.log(cons)
    }
})