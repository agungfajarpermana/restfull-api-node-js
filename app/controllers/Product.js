exports.get_all_products = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "It's work"
    })
}

exports.create_data_products = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Created produtcs"
    })
}

exports.get_detail_products = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Detail products"
    })
}

exports.update_data_products = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Updated products"
    })
}

exports.delete_data_products = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Deleted products"
    })
}