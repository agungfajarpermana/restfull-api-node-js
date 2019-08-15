const express = require("express")
const router  = express.Router()

// verify token
const checkAuth = require("../app/middleware/check_auth")

// validation is admin
const isAdmin = require("../app/middleware/is_admin")

const UserController = require("../app/controllers/User")

router.post("/signup", checkAuth, isAdmin, UserController.signup)

router.post("/signin", UserController.signin)

module.exports = router