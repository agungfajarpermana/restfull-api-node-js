const express = require("express")
const router  = express.Router()

const UserController = require("../app/controllers/User")

router.post("/signup", UserController.signup)

module.exports = router