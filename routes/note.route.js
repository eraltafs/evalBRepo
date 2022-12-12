const { Router } = require("express");
const {NoteModel} =require("../models/note.model")

const notesRouter = Router()

notesRouter.get("/",async(req,res)=>{
    try{
        
        res.send(await NoteModel.find())
    }catch(err){
        console.log(err)
    }
})

notesRouter.post("/create",async(req, res)=>{
    try{
        const new_note = new NoteModel(req.body)
        await new_note.save()
        
        res.send({msg:"notes created"})

    }catch(err){
        console.log(err)
    }
})
notesRouter.patch("/update/:noteId", async(req, res)=>{
    const noteId = req.params.noteId
    const userId = req.body.userId
    const note = await NoteModel.findOne({_id:noteId})
    if(userId!==note.userId){
        res.send({msg:"You are not Authorised"})

    }else{
        await NoteModel.findByIdAndUpdate({_id:noteId}, req.body)
        res.send({msg:"notes updated"})
    }

})

notesRouter.delete("/delete/:noteId", async(req, res)=>{
    const noteId = req.params.noteId
    const userId = req.body.userId
    const note = await NoteModel.findOne({_id:noteId})
    if(userId!==note.userId){
        res.send({msg:"You are not Authorised"})

    }else{
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.send({msg:"notes deleted"})
    }

})

module.exports = {notesRouter}