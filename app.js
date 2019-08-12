const express       = require("express")
const app           = express()
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser")
const morgan        = require("morgan")

// ROUTE CONTROLLERS
const OrderRoute      = require("./routes/Order")
const ProductRoute    = require("./routes/Product")

// .env File
require("dotenv/config")

// SETTING DATABASE
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if(err) console.log(err)

    console.log("Connected database")
})

// SETTING UP Body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// SETTING UP MORGAN (LOG IN SERVER)
app.use(morgan("dev"))

// SETTING ROUTE API
app.use("/api/products", ProductRoute)
app.use("/api/orders", OrderRoute)

// HANDLING ERROR REQUEST
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app