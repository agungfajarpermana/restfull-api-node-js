const mongoose = require("mongoose")
const fs       = require("fs")

// MODEL MONGODB
const Product = require("../models/Product")

exports.get_all_products = (req, res, next) => {
    Product.find({}, "name price _id image", (err, products) => {
        if(err)
            return next(new Error("No data entries"))
        
        res.status(200).json({
            total: products.length,
            products: products.map(product => {
               return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    requests_detail: {
                        type: "GET",
                        url: `http://localhost:3000/api/products/${product._id}`
                    }
               }
            })
        })
    })
}

exports.create_data_products = (req, res, next) => {
    Product.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    }, (err, product) => {
        if(err)
            return next(new Error(err))

        res.status(200).json({
            products: {
                _id: product._id,
                name: product.name,
                price: product.price,
                requests_detail: {
                    type: "GET",
                    url: `http://localhost:3000/api/products/${product._id}`
                }
            }
        })
    })
}

exports.get_detail_products = (req, res, next) => {
    Product.findById(req.params.productId, "name price _id image", (err, products) => {
        if(err)
            return next(err)
        else if(!products)
            return next(new Error("Product not found"))

        res.status(200).json({
            products: {
                _id: products._id,
                name: products.name,
                price: products.price,
                image: products.image,
                requests_all: {
                    type: "GET",
                    url: `http://localhost:3000/api/products`
                }
            }
        })
    })
}

exports.update_data_products = (req, res, next) => {
    Product.findById(req.params.productId, "name price _id image", (err, products) => {
        if(err) 
            return next(err)
        else if (!products)
            return next(new Error("Product not found"))
        
        fs.unlink(`./${products.image}`, (err) => {
            if(err)
                return next(new Error("Image not found"))

            Product.updateOne({_id: products._id}, {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    image: `uploads/${req.file.filename}`
                }
            }, (err) => {
                if(err)
                    return next(new Error("Problem updated products"))
               
                res.status(200).json({
                    products: {
                        _id: products._id,
                        name: req.body.name,
                        price: req.body.price,
                        image: `uploads/${req.file.filename}`,
                        requests_detail: {
                            type: "GET",
                            url: `http://localhost:3000/api/products/${products._id}`
                        }
                    }
                })
            })
        })
    })
}

exports.delete_data_products = (req, res, next) => {
    Product.findById(req.params.productId, (err, products) => {
        if(err)
            return next(err)
        else if(!products)
            return next(new Error("Product not found"))

        fs.unlink(`./${products.image}`, (err) => {
            if(err)
                return next("Image not found")

            Product.deleteOne({_id: products._id}, (err) => {
                if(err)
                    return next(new Error("Problem deleted product"))
    
                res.status(200).json({
                    message: "Deleted products!",
                    requests_all: {
                        type: "GET",
                        url: "http://localhost:3000/api/products"
                    }
                })
            })
        })
    })
}