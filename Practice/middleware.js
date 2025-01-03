let express = require("express");
let app = express();

app.use((req,res,next)=>{
    console.log("from middle ware");
    next();
    console.log("bye from middleware")
});

app.get("/",(req,res)=>{
    res.send("main route");
    console.log("from main route")
})

app.get("/about",(req,res)=>{
    res.send("about route")
})
app.get("/contact",(req,res)=>{
    res.send("contact route");
    console.log("from contact route")
})

app.listen("5000",()=>{
    console.log("on 5000 port")
});

