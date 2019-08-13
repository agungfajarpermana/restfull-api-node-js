const express  = require("express")
const router   = express.Router()

// UPLOAD FILE
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+"_"+file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null, true)
    }else{
        cb(new Error("Extension file not match"), false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const ProductController = require("../app/controllers/Product")

router.get("/", ProductController.get_all_products)

router.post("/", upload.single("productImage"), ProductController.create_data_products)

router.get("/:productId", ProductController.get_detail_products)

router.patch("/:productId", ProductController.update_data_products)

router.delete("/:productId", ProductController.delete_data_products)

module.exports = router