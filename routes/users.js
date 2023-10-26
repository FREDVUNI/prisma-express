const express = require("express")
const router = express.Router()
const {getUsers,createUser,deleteUser,signIn}  = require("../controllers/users")
// const authenticate = require("../helpers/authenticate") 

router.get("/",getUsers)
// router.get("/",authenticate,getUsers)
router.post("/signup",createUser)
router.post("/signin",signIn)
router.delete("/:id",deleteUser)

module.exports = router