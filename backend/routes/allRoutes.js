const express = require('express')
const { registerController, loginController, updateUserController } = require('../controllers/userController')
const { addBookController,approveBookController } = require('../controllers/bookController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthmiddleware')
const jwtAdminMiddleware = require('../middlewares/jwtAdminMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

//To setup routesoutside express server create object for router class of express.
const router = new express.Router()


//register
router.post("/register",registerController)

router.post("/login",loginController)

router.post("/addBook",jwtAuthMiddleware,multerMiddleware.array("uploadImages",3),addBookController)

router.post("/approveBook",jwtAdminMiddleware,approveBookController)

router.put("/updateUser/:id",jwtAuthMiddleware,multerMiddleware.single("profileImage"),updateUserController)

module.exports = router