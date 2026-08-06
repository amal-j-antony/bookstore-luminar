const express = require('express')
const { registerController, loginController, updateUserController, getAllUsersController, updateAdminController, googleAuthCOntroller } = require('../controllers/userController')
const { addBookController,approveBookController, getHomeBooks, getAllBooksController, viewBookController, getUserUploadedBooks, getPurchaseHistory, deleteBookController, getAllBooksAdminController } = require('../controllers/bookController')
const jwtAuthMiddleware = require('../middlewares/jwtAuthmiddleware')
const jwtAdminMiddleware = require('../middlewares/jwtAdminMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

//To setup routesoutside express server create object for router class of express.
const router = new express.Router()


//register
router.post("/register",registerController)
//login
router.post("/login",loginController)
//add book
router.post("/addBook",jwtAuthMiddleware,multerMiddleware.array("uploadImages",3),addBookController)
//update user
router.put("/updateUser/:id",jwtAuthMiddleware,multerMiddleware.single("profileImage"),updateUserController)
//getBooks
router.get('/getHomeBooks',getHomeBooks)
//get all books
router.get('/getAllBooks',jwtAuthMiddleware,getAllBooksController)
//get a particular book by id
router.get('/viewBook/:id',jwtAuthMiddleware,viewBookController)
//get books uploaded by user
router.get("/userBooks",jwtAuthMiddleware,getUserUploadedBooks)
//get purchase history
router.get("/purchaseHistory",jwtAuthMiddleware,getPurchaseHistory)
//delete a book by id
router.delete("/deleteBook/:bookID",jwtAuthMiddleware,deleteBookController)
//get all books: admin
router.get("/allBooks/admin",jwtAdminMiddleware,getAllBooksAdminController)
//approve book: admin
router.put("/approveBook/:bookID",jwtAdminMiddleware,approveBookController)
//get users : admin
router.get("/getUsers",jwtAdminMiddleware,getAllUsersController)
//update admin
router.put("/updateAdmin/:id",jwtAdminMiddleware,multerMiddleware.single("profileImage"),updateAdminController)
//google auth
router.post("/googleAuth",googleAuthCOntroller)

module.exports = router