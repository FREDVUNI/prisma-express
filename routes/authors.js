const express = require("express")
const router = express.Router()
const authorController = require("../controllers/authors")

router.get("/",authorController.getAuthors)
router.post("/",authorController.addAuthor)
router.get("/:id",authorController.getAuthor)
router.put("/:id",authorController.updateAuthor)
router.delete("/:id",authorController.deleteAuthor)

module.exports = router