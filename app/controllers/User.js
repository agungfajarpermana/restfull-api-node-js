const mongoose  = require("mongoose")
const User      = require("../models/User")
const bcrypt    = require("bcrypt")

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err)
            return next(err)
        
        User.create({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
        }, (err, users) => {
            if(err)
                return next(new Error("Email exists"))

            res.status(200).json({
                message: "Success signup",
                users: {
                    email: users.email,
                    password: users.password
                }
            })
        })
    })
}