const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
dotenv.config({path:".env"})

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/v1/quotes",require("./routes/quotes"))
app.use("/api/v1/authors",require("./routes/authors"))  
app.use("/api/v1/users",require("./routes/users")) 

module.exports = app