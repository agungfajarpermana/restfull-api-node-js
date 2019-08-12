const mongoose = require("mongoose")
// MODEL MONGODB
const Product = require("../models/Product")

exports.get_all_products = (req, res, next) => {
    Product.find({}, "name price _id", (err, products) => {
        if(err)
            return next(new Error("No data entries"))
        
        res.status(200).json({
            total: products.length,
            products: products.map(product => {
               return {
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
    })
}

exports.create_data_products = (req, res, next) => {
    Product.create({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
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
    Product.findById(req.params.productId, "name price _id", (err, products) => {
        if(err)
            return next(err)
        else if(!products)
            return next(new Error("Product not found"))

        res.status(200).json({
            products: {
                _id: products._id,
                name: products.name,
                price: products.price,
                requests_all: {
                    type: "GET",
                    url: `http://localhost:3000/api/products`
                }
            }
        })
    })
}

exports.update_data_products = (req, res, next) => {
    Product.findById(req.params.productId, "name price _id", (err, products) => {
        if(err) 
            return next(err)
        else if (!products)
            return next(new Error("Product not found"))

        Product.updateOne({_id: products._id}, {
            $set: {
                name: req.body.name,
                price: req.body.price
            }
        }, (err) => {
            if(err)
                return next(new Error("Problem updated products"))
           
            res.status(200).json({
                products: {
                    _id: products._id,
                    name: req.body.name,
                    price: req.body.price,
                    requests_detail: {
                        type: "GET",
                        url: `http://localhost:3000/api/products/${products._id}`
                    }
                }
            })
        })
    })
}

exports.delete_data_products = (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
        if(err)
            return next(err)
        else if(!product)
            return next(new Error("Product not found"))

        Product.deleteOne({_id: product._id}, (err) => {
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
}