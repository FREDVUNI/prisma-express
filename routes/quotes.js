const express = require("express")
const router = express.Router()
const quotesController = require("../controllers/quotes")
const validateJoi = require("../helpers/validateJoi")
const quoteSchema = require("../helpers/quoteSchema")

router.get("/",quotesController.getQuotes)
router.post("/",validateJoi(quoteSchema),quotesController.addQuote)
router.get("/:id",quotesController.getQuote)
router.patch("/:id",validateJoi(quoteSchema),quotesController.updateQuote)
router.delete("/:id",quotesController.deleteQuote)

module.exports = router