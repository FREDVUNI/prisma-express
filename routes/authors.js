const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authors")
const validateJoi = require("../helpers/validateJoi")
const authorSchema = require("../helpers/authorSchema")


router.get("/",authorController.getAuthors)
router.post("/",validateJoi(authorSchema),authorController.addAuthor)
router.get("/:id",authorController.getAuthor)
router.patch("/:id",validateJoi(authorSchema),authorController.updateAuthor)
router.delete("/:id",authorController.deleteAuthor)

module.exports = router