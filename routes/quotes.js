const express = require("express")
const router = express.Router()
const quotesController = require("../controllers/quotes")

router.get("/",quotesController.getQuotes)
router.post("/",quotesController.addQuote)
router.get("/:id",quotesController.getQuote)
router.patch("/:id",quotesController.updateQuote)
router.delete("/:id",quotesController.deleteQuote)

module.exports = router