const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
    "title":String,
    "body":String,
    "author":String,
    "category":String
});

const NotesModel = mongoose.model("Notes",NotesSchema);

module.exports = {
    NotesModel
}