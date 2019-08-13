const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Name wajib di isi!"]
    },
    price: {
        type: Number,
        required: [true, "Price wajib di isi!"]
    },
    image: {
        type: String,
        default: "uploads/default_image.png"
    }
})

module.exports = mongoose.model("Product", productSchema)