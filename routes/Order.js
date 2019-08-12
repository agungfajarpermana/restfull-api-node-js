const express = require("express")
const router  = express.Router()

const OrderController = require("../app/controllers/Order")

router.get("/", OrderController.get_all_orders)

router.post("/", OrderController.create_data_orders)

router.get("/:orderId", OrderController.get_detail_orders)

router.patch("/:orderId", OrderController.update_data_orders)

router.delete("/:orderId", OrderController.delete_data_orders)

module.exports = router