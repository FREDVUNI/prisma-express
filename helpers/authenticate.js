const JWT = require("jsonwebtoken")

const authenticate = (req,res,next) =>{
    const authHeader = req.headers['Authorization']
    
    if(authHeader){
        if(authHeader.startsWith("Bearer")){
            const token = authHeader.split(" ")[1]
            JWT.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                if(err){
                    res.status(403).json("You\'re not authorized.")
                }else{
                    console.log(decoded)  
                    next()
                }
            })
        }else{
            res.status(403).json("The token is invalid.")
        }

    }else{
        res.status(403).json("You\'re not authorized.")
    }

}

module.exports = authenticate