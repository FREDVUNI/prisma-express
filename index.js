const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
dotenv.config({path:".env"})


app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/quotes",require("./routes/quotes"))
app.use("/authors",require("./routes/authors"))

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server has started on http://localhost/${PORT}`)
})