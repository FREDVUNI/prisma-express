const express = require("express")
const router = express.Router()
const {getUsers,createUser}  = require("../controllers/users")
const authenticate = require("../helpers/authenticate")
const userSchema = require("../helpers/userSchema")
const validateJoi = require("../helpers/validateJoi")

router.get("/",authenticate,getUsers)
router.post("/",[authenticate,validateJoi(userSchema)],createUser)

module.exports = router