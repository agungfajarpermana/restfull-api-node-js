const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        validate: {
            validator: (v) => {
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v)                
            },
            message: props => `${props.value} is not valid email`
        },
        required: [true, "Email wajib di isi!"]
    },
    password: {
        type: String,
        required: [true, "Password wajib di isi!"]
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User", userSchema)