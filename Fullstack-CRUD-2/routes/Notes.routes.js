const express = require("express");

const NotesRouter = express.Router();

const { NotesModel } = require("../model/Notesmodel");

NotesRouter.get("/", (req, res) => {
  res.send("Notes");
});

NotesRouter.post("/create", async (req, res) => {
  try {
    const note = new NotesModel(req.body);
    await note.save();
    res.status(200).send({ message: "Note has been added successfully" });
  } catch (error) {
    res.status(400).send({ message: "failed to add note" });
  }
});

NotesRouter.patch("/update/:noteid",async(req,res)=>{
    const {noteid} = req.params;

    const payload = req.body;
    if(noteid && payload){
        try {
            await NotesModel.findByIdAndUpdate({_id:noteid},payload);
            res.status(200).send({message:`note ${noteid} has been updated successfully`})
        }
        catch (error) {
            console.log(error)
            res.status(400).send({message:"error in details of note id or field"})
        
        }
    }
    else{
        res.status(400).send({message:"invalid details"})
    }
     
   


})


module.exports = {
  NotesRouter,
};
