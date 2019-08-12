const express  = require("express")
const router   = express.Router()

const ProductController = require("../app/controllers/Product")

router.get("/", ProductController.get_all_products)

module.exports = router