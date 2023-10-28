const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authors")
const validateJoi = require("../helpers/validateJoi")
const authorSchema = require("../helpers/authorSchema")
const authenticate = require("../helpers/authenticate")

router.get("/",authorController.getAuthors)
router.post("/",[authenticate,validateJoi(authorSchema)],authorController.addAuthor)
router.get("/:id",authenticate,authorController.getAuthor)
router.patch("/:id",[authenticate,validateJoi(authorSchema)],authorController.updateAuthor)
router.delete("/:id",authenticate,authorController.deleteAuthor)

module.exports = router