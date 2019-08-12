exports.get_all_orders = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "It's work"
    })
}

exports.create_data_orders = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Created orders"
    })
}

exports.get_detail_orders = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Detail orders"
    })
}

exports.update_data_orders = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Updated orders"
    })
}

exports.delete_data_orders = (req, res, next) => {
    res.status(200).json({
        status: true,
        message: "Deleted orders"
    })
}