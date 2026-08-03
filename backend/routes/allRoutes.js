const express = require('express')
const { registerController, loginController, updateUserController } = require('../controllers/userController')
const { addBookController,approveBookController, getHomeBooks, getAllBooksController, viewBookController, getUserUploadedBooks, getPurchaseHistory, deleteBookController } = require('../controllers/bookController')
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

router.get('/getHomeBooks',getHomeBooks)

router.get('/getAllBooks',jwtAuthMiddleware,getAllBooksController)

router.get('/viewBook/:id',jwtAuthMiddleware,viewBookController)

router.get("/userBooks",jwtAuthMiddleware,getUserUploadedBooks)

router.get("/purchaseHistory",jwtAuthMiddleware,getPurchaseHistory)

router.delete("/deleteBook/:bookID",jwtAuthMiddleware,deleteBookController)

module.exports = router