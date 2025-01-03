let http = require("http");
let fs = require("fs");

let server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write("i'm the response");
        res.end("ended")
    }
    else if(req.url === "/data"){
         fs.readFile("./text.txt","utf-8",(err,data)=>{
            if(err){
                res.write("no data");
                res.end()
            }
            else{
                res.end(data)
            }
        })
    }
    else{
        res.end("invalid end point")
    }
});

server.listen("7660",()=>{
    console.log("listening to the port 7660")
})