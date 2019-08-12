const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name wajib di isi!"]
    },
    price: {
        type: Number,
        required: [true, "Price wajib di isi!"]
    }
})

module.exports = mongoose.model("Product", productSchema)