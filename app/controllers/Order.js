const Order     = require("../models/Order")
const Product   = require("../models/Product")

exports.get_all_orders = (req, res, next) => {
    Order.find({}, "productId quantity _id", (err, orders) => {
        if(err)
            return next(err)
        else if(!orders)
            return next(new Error("Order not found"))

        res.status(200).json({
            total: orders.length,
            orders: orders.map(order => {
                return {
                    orders: {
                        _id: order._id,
                        productId: order.productId,
                        quantity: order.quantity,
                    },
                    requests_detail: {
                        type: "GET",
                        url: `http://localhost:3000/api/orders/${order._id}`
                    },
                    requests_post: {
                        type: "POST",
                        url: "http://localhost:3000/api/orders",
                        rules: {
                            logged: "required",
                            productId: "required",
                            quantity: "optional"
                        }
                    },
                    requests_update: {
                        type: "PATCH",
                        url:  `http://localhost:3000/api/orders/${order._id}`,
                        rules: {
                            logged: "required",
                            productId: "required",
                            quantity: "optional"
                        }
                    },
                    requests_delete: {
                        type: "DELETE",
                        url: `http://localhost:3000/api/orders/${order._id}`,
                        rules: {
                            logged: "required",
                            _id: "required"
                        }
                    }
                }
            })
        })
    })
}

exports.create_data_orders = (req, res, next) => {
    Product.findById(req.body.productId, (err, products) => {
        if(err)
            return next(new Error("Product not found"))

        Order.create({
            productId: products._id,
            quantity: req.body.quantity
        }, (err, orders) => {
            if(err)
                return next(new Error(err))
    
            res.status(200).json({
                status: true,
                orders: {
                    _id: orders._id,
                    productId: orders.productId,
                    quantity: orders.quantity,
                    requests_detail: {
                        type: "GET",
                        url: `http://localhost:3000/api/orders/${orders._id}`
                    }
                }
            })
        })
    })
}

exports.get_detail_orders = (req, res, next) => {
    Order.findById(req.params.orderId, (err, orders) => {
        if(err)
            return next(err)
        else if(!orders)
            return next(new Error("Order not found"))

        res.status(200).json({
            orders: {
                _id: orders._id,
                productId: orders.productId,
                quantity: orders.quantity
            },
            requests_all: {
                type: "GET",
                url: "http://localhost:3000/api/orders"
            }
        })
    })
}

exports.update_data_orders = (req, res, next) => {
    Order.findById(req.params.orderId, (err, orders) => {
        if(err)
            return next(err)
        else if(!orders)
            return next(new Error("Order not found"))

        Order.updateOne({_id: orders._id}, {
            $set: {
                productId: req.body.productId,
                quantity: req.body.quantity
            }
        }, (err) => {
            if(err)
                return next(new Error("Problem updated order"))

            res.status(200).json({
                orders: {
                    _id: orders._id,
                    productId: req.body.productId,
                    quantity: req.body.quantity
                },
                requests_detail: {
                    type: "GET",
                    url: `http://localhost:3000/api/orders/${orders._id}`
                }
            })
        })
    })
}

exports.delete_data_orders = (req, res, next) => {
    Order.findById(req.params.orderId, (err, orders) => {
        if(err)
            return next(err)
        else if(!orders)
            return next(new Error("Order not found"))

        Order.deleteOne({_id: orders._id}, (err) => {
            if(err)
                return next(err)

            res.status(200).json({
                message: "Deleted order",
                requests_all: {
                    type: "GET",
                    url: "http://localhost:3000/api/orders"
                }
            })
        })
    })
}