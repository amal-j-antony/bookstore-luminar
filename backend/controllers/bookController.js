const books = require('../models/bookModel')

exports.addBookController = async (req, res) => {
    console.log('Inside book controller');
    try {
        const { bookTitle, publisher, author, isbn, imageURL, language, totalPages, category, price, discountPrice, abstract } = req.body
        console.log(bookTitle, publisher, author, isbn, imageURL, language, totalPages, category, price, discountPrice, abstract);

        const uploadImages = req.files.map(item => item.filename)
        const sellerEmail = req.email
        console.log(sellerEmail);
        

        const existingBook = await books.findOne({ bookTitle, sellerEmail })
        console.log(existingBook);
        
        if (existingBook) {
            res.status(409).json({
                error: 409,
                message: "Book already exists "
            })
        } else {
            const newBook = await books.create({
                bookTitle, publisher, author, isbn, imageURL, language, totalPages, category, price, discountPrice, abstract, uploadImages, sellerEmail
            })
            res.status(200).json({
                status: "Success",
                data: newBook
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "ServerError",
            error: error.message
        })
    }

}

exports.approveBookController = async (req, res) => {
    console.log('Approve book initialized');
    res.status(200).json("Book Approved")

}

exports.getHomeBooks = async (req,res) => {
    console.log('Get books');
    try {
        const bookList = await books.find().sort({_id: -1}).limit(4)
        res.status(200).json(bookList)
    } catch (error) {
        res.status(500).json({
            status: "Server error",
            message: error.message
        })   
    }
}

exports.getAllBooksController = async (req,res) => {
    const sellerEmail = req.email
    try {
        const result = await books.find({sellerEmail: {$ne: sellerEmail}})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            error: "server error",
            details: error.message
        })
    }
}

exports.viewBookController = async (req,res) => {
    const {id} = req.params
    try {
        const result = await books.findById({_id: id})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//get books uploaded by user
exports.getUserUploadedBooks = async (req,res) => {
    const sellerEmail = req.email
    try {
        const result = await books.find({sellerEmail})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}