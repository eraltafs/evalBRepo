const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication =(req, res, next)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        var decoded = jwt.verify(token, process.env.priavte_key);
        if(decoded){
            const userId = decoded.userId
            console.log(userId)
            
            req.body.userId = userId
            next()
        }
        else{
            res.send({msg:"Please Login"})
        }
       

    }else{
        res.send({msg:"Please Login"})
    }
    
}

module.exports ={authentication}