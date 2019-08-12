const express  = require("express")
const router   = express.Router()

const ProductController = require("../app/controllers/Product")

router.get("/", ProductController.get_all_products)

router.post("/", ProductController.create_data_products)

router.get("/:productId", ProductController.get_detail_products)

router.patch("/:productId", ProductController.update_data_products)

router.delete("/:productId", ProductController.delete_data_products)

module.exports = router