const express = require("express");

let app = express();
const port = 6543

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("homepage");
    
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})