const express = require("express")
const router = express.Router()
const {getUsers,createUser,deleteUser}  = require("../controllers/users")
// const authenticate = require("../helpers/authenticate") 

router.get("/",getUsers)
// router.get("/",authenticate,getUsers)
router.post("/",createUser)
router.delete("/:id",deleteUser)

module.exports = router