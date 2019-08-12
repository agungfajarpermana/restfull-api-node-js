const express       = require("express")
const app           = express()
const mongoose      = require("mongoose")
const bodyParser    = require("body-parser")
const orderRoute    = require("./routes/Order")

require("dotenv/config")

// SETTING DATABASE
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err) => {
    if(err) console.log(err)

    console.log("Connected database")
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// SETTING ROUTE API
app.use("/api/orders", orderRoute)

app.listen(process.env.PORT, () => {
    console.log("running on port", process.env.PORT)
})