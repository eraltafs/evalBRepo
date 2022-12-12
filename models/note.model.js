const mongoose = require("mongoose")

const NoteSchema = mongoose.Schema({
    taskname :String,
    status :String,
    tag:String,
    userId:String
})



const NoteModel = mongoose.model("note", NoteSchema)


module.exports = {NoteModel}