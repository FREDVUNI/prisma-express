const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const JWT = require("jsonwebtoken")

const getUsers = async (res,req) =>{
    try{
        const users = await prisma.user.findMany({})
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json(error.message || 'There was a server error.')
    }
}

const createUser = async (req,res) =>{
    try{
        const {username,password} = req.body
        const newUser = await prisma.user.create({
            data:{username,password}
        })
        res.status(200).json(
            {
                message:"User has been added.",
                token:JWT.sign({user:newUser},process.env.SECRET_KEY)
            })
    }
    catch(error){
        res.status(500).json(error.message || 'There was a server error.')
    }
}

module.exports = {getUsers,createUser}