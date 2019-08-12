const express  = require("express")
const mongoose = require("mongoose")
const router   = express.Router()

const OrderController = require("../app/controllers/Order")

router.get("/", OrderController.get_all_orders)

module.exports = router