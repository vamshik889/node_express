const express = require("express");
const connection = require("./dbConnection");
const {User, Address} = require("./userAndAddressSchema");

const app = express();
const port = "5002";

app.use(express.json());
app.get("/", (req, res) => {
  console.log("get method");
  res.send("get");
});

app.post("/createuser", async (req, res) => {
    try {
        const address = await Address.create(req.body.address);
        const user = await User.create({...req.body.user,address:address._id})
        res.send(user);
    } catch (error) {
        console.log("failed to add user",error)
    }

});
app.get("/user/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
         let userdetails = await User.findById(id).populate("address")
        res.json(userdetails);
    } catch (error) {
        console.log("failed to fetch the user details",error)
    }

})
app.listen(port, async () => {
  try {
    await connection;
    console.log("connectiion to db is successful");
  } catch (error) {
    console.log("connection to db is failed !", error);
  }
  console.log(`listening to prort ${port}`);
});
