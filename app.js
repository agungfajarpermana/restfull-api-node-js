const express       = require("express")
const app           = express()
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser")

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

// SETTING ROUTE API
app.use("/api/products", ProductRoute)
app.use("/api/orders", OrderRoute)

module.exports = app