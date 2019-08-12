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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// SETTING UP CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH")
        return res.send(200).json({})
    }
    next()
})

// SETTING UP MORGAN (LOG IN SERVER)
app.use(morgan("dev"))

// SETTING ROUTE API
app.use("/api/products", ProductRoute)
app.use("/api/orders", OrderRoute)

// HANDLING ERROR REQUEST
app.use((req, res, next) => {
    const error = new Error("Request Route Not Found")
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