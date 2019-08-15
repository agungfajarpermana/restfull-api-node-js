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
                    requests: {
                        detail: {
                            type: "GET",
                            url: `http://localhost:3000/api/products/${product._id}`
                        },
                        create: {
                            type: "POST",
                            url: "http://localhost:3000/api/products",
                            rules: {
                                logged: "required",
                                id: "required"
                            }
                        },
                        update: {
                            type: "PATCH",
                            url:  `http://localhost:3000/api/products/${product._id}`,
                            rules: {
                                logged: "required",
                                id: "required"
                            }
                        },
                        delete: {
                            type: "DELETE",
                            url: `http://localhost:3000/api/products/${product._id}`,
                            rules: {
                                logged: "required",
                                id: "required"
                            }
                        }
                    }
               }
            })
        })
    })
}

exports.create_data_products = (req, res, next) => {
    if(req.file){
        var data = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            image: `uploads/${req.file.filename}`
        }
    }else{
        var data = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        }
    }
    
    Product.create(data, (err, product) => {
        if(err)
            return next(new Error(err))

        res.status(200).json({
            products: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                requests: {
                    detail: {
                        type: "GET",
                        url: `http://localhost:3000/api/products/${product._id}`
                    }
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
                requests: {
                    all: {
                        type: "GET",
                        url: `http://localhost:3000/api/products/${products._id}`
                    }
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
        
        // check request file 
        if(req.file){
            if(products.image.split("uploads/")[1] !== "default_image.png"){
                // delete file upload and update file upload
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
                                requests: {
                                    detail: {
                                        type: "GET",
                                        url: `http://localhost:3000/api/products/${products._id}`
                                    }
                                }
                            }
                        })
                    })
                })
    
            }else{
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
                            requests: {
                                detail: {
                                    type: "GET",
                                    url: `http://localhost:3000/api/products/${products._id}`
                                }
                            }
                        }
                    })
                })
                
            }
        }else{
            Product.updateOne({_id: products._id}, {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                }
            }, (err) => {
                if(err)
                    return next(new Error("Problem updated products"))
            
                res.status(200).json({
                    products: {
                        _id: products._id,
                        name: req.body.name,
                        price: req.body.price,
                        image: products.image,
                        requests: {
                            detail: {
                                type: "GET",
                                url: `http://localhost:3000/api/products/${products._id}`
                            }
                        }
                    }
                })
            })

        }
    })
}

exports.delete_data_products = (req, res, next) => {
    Product.findById(req.params.productId, (err, products) => {
        if(err)
            return next(err)
        else if(!products)
            return next(new Error("Product not found"))

        // check file name in database
        if(products.image.split("uploads/")[1] !== "default_image.png"){
            // delete file upload and delete product
            fs.unlink(`./${products.image}`, (err) => {
                if(err)
                    return next("Image not found")

                Product.deleteOne({_id: products._id}, (err) => {
                    if(err)
                        return next(new Error("Problem deleted product"))
        
                    res.status(200).json({
                        message: "Deleted products!",
                        requests: {
                            all: {
                                type: "GET",
                                url: "http://localhost:3000/api/products"
                            }
                        }
                    })
                })
            })
        }else{
            Product.deleteOne({_id: products._id}, (err) => {
                if(err)
                    return next(new Error("Problem deleted product"))
    
                res.status(200).json({
                    message: "Deleted products!",
                    requests: {
                        all: {
                            type: "GET",
                            url: "http://localhost:3000/api/products"
                        }
                    }
                })
            })
        }
    })
}