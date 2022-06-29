const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

exports.getAuthors = async (req,res) =>{
    try{
        const authors = await prisma.author.findMany({
            include:{quotes:true}
        })
        res.status(200).json({message:"All authors",data:authors})
    }
    catch(error){
        res.status(404).json({error:error.message || "There was an error."})
    }
}

exports.addAuthor = async (req,res) =>{
    try{
        const {name} = req.body

        const a = await prisma.author.findMany({})

        const filterAuthor = a.some(item => item.name == name)

        if(!filterAuthor){
            if(Object.keys(req.body.name).length !== 0){
                const newAuthor = await prisma.author.create({
                    data:{name} 
                })

                res.status(200).json({message:"Author has been added.",author:newAuthor})
            }else{
                res.status(400).json(`All fields are required.`)
            }
        }else{
             res.status(400).json(`Author with this id already exists.`)
        }
    }
    catch(error){
        res.status(400).json({error:error.message || "There was an error."})
    }
}

exports.getAuthor = async (req,res) =>{
    try{
        const id = await req.params.id

        if(id){
            const author = await prisma.author.findUnique({
                where:{
                    id:Number(id)
                },
                include:{
                    quotes:true
                }
            })
            res.status(200).json({message:`Author id ${id}`,author:author})
        }else{
            res.status(404).json(`The id does not exist.`)
        }
    }
    catch(error){
        res.status(404).json({error:error.message || "There was an error."})
    }
}

exports.updateAuthor = async (req,res) =>{
    try{
        const id = await req.params.id
        
        if(id){
            const {name} = req.body
            if(Object.keys(req.body.name).length !== 0){
                const author = await prisma.author.update({
                    data:{name},
                    where:{
                        id:Number(id)
                    }
                })
                res.status(200).json({message:"Author has been updated.",author:author})
            }else{
                res.status(400).json(`All fields are required.`)
            }
        }else{
            res.status(404).json(`The id does not exist.`)
        }
    }
    catch(error){
        res.status(500).json({error:error.message || "There was an error."})
    }
}

exports.deleteAuthor = async (req,res) =>{
    try{
        const id = await req.params.id

        if(id){
            const author = await prisma.author.delete({
                where:{
                    id:Number(id)
                }
            })
            res.status(200).json({message:"Author has been deleted.",author:author})
        }else{
            res.status(404).json(`The id does not exist.`)
        }

    }
    catch(error){
        res.status(500).json({error:error.message || "There was an error."})
    }
}