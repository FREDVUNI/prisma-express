const express = require("express")
const router = express.Router()
const {getUsers,createUser}  = require("../controllers/users")
const authenticate = require("../helpers/authenticate") 

router.get("/",authenticate,getUsers)
router.post("/",createUser)

module.exports = router