const express = require("express")
const router  = express.Router()

// verify token
const checkAuth = require("../app/middleware/check_auth")

// order controllers
const OrderController = require("../app/controllers/Order")

router.get("/", OrderController.get_all_orders)

router.post("/", checkAuth, OrderController.create_data_orders)

router.get("/:orderId", OrderController.get_detail_orders)

router.patch("/:orderId", checkAuth, OrderController.update_data_orders)

router.delete("/:orderId", checkAuth, OrderController.delete_data_orders)

module.exports = router