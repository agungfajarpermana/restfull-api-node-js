module.exports = (req, res, next) => {
    if(req.decoded.admin)
        return next()

    return next(new Error("Whoops!, forbbiden page"))
}