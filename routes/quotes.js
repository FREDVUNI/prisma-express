const express = require("express")
const router = express.Router()
const quotesController = require("../controllers/quotes")
const validateJoi = require("../helpers/validateJoi")
const quoteSchema = require("../helpers/quoteSchema")
const authenticate = require("../helpers/authenticate")

router.get("/",quotesController.getQuotes)
router.post("/",[authenticate,validateJoi(quoteSchema)],quotesController.addQuote)
router.get("/:id",quotesController.getQuote)
router.patch("/:id",[authenticate,validateJoi(quoteSchema)],quotesController.updateQuote)
router.delete("/:id",authenticate,quotesController.deleteQuote)

module.exports = router