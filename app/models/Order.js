const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID wajib di isi!"]
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model("Order", orderSchema)