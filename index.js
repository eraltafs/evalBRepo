const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
require("dotenv").config()

const {connection} = require("./config/db")
const {UserModel} = require("./models/user.model")
const {notesRouter} = require("./routes/note.route")
const {authentication} =require("./middleware/authentication")

const app = express()

app.use(express.json())


app.get("/",(req,res)=>{
    res.send({msg:"Welcome"})
})


app.post("/signup",async(req,res)=>{
    const {email, password} = req.body
    
    try{
        const user = await UserModel.findOne({email})
        if(user?.email){
            res.send({msg:"user exist please login"})
        }else{
            bcrypt.hash(password, 5, async function(err, hash) {
                // Store hash in your password DB.
                const  new_user = new UserModel({email, password:hash})
                await new_user.save()
                res.send({msg:"User Created"})
            });
        }
    }catch(err){
        console.log(err)
    }

})


app.post("/login",async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({userId: user._id }, process.env.priavte_key);
                    res.send({msg:"successfuly signed in",token})
                }else{
                    res.send({msg:"login Again"})
                }
            });
        }else{
            res.send({msg:"login Again"})
        }
    }catch(err){

    }
})
app.use(authentication)
app.use("/notes", notesRouter)
app.listen(8000,async(req, res)=>{
    try{
        await connection
        console.log({msg:"connected to db"})
    }catch(err){
        console.log(err)
        console.log({msg:"Not connected to db"})
       
    }
    console.log("listening on port 8080")
})