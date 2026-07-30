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
            res.status(409).json("Error: User has added book already")
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