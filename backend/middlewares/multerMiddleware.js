const multer = require("multer")

//define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req,file ,callback) => {
        callback(null, `image_${Date.now()}_${file.originalname}`)
    }
})

//filefilter
const fileFilter = (req, file, callback) => {
    if(file.mimetype.startsWith("image/")){
        callback(null, true)
    }else {
        callback(null, false)
    }
}

const multerMiddleware = multer({
    storage, fileFilter
})

module.exports = multerMiddleware

