const mongoose  = require("mongoose")
const bcrypt    = require("bcrypt")
const jwt       = require("jsonwebtoken")

// .env file
require("dotenv/config")

// User model
const User = require("../models/User")

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
                return next(err)

            res.status(200).json({
                message: "Success signup",
                users: {
                    email: users.email,
                    admin: users.admin
                }
            })
        })
    })
}

exports.signin = (req, res, next) => {
    User.findOne({email: req.body.email}, (err, users) => {
        if(err)
            return next(err)
        else if(!users)
            return next(new Error("Signin failed, just reports to admin!"))

        bcrypt.compare(req.body.password, users.password, (err, result) => {
            if(err)
                return next(new Error("Password not match!"))
            
            // generate token
            jwt.sign({
                id: users._id,
                email: users.email,
                admin: users.admin
            }, process.env.JWT_Secret, { expiresIn: "1 days" }, (err, token) => {
                if(err)
                    return next(err)

                res.status(200).json({
                    message: "Sign in success",
                    token: token,
                })
            })
        })
    })
}