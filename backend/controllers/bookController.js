const books = require('../models/bookModel')
const {GoogleGenerativeAI} = require('@google/generative-ai')

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
    const {bookID} = req.params
    console.log('Approve book initialized');
    try {
        const result = await books.updateOne({_id: bookID},{$set:{status: "Approved"}})
        // books.findByIdAndUpdate({_id: bookID},{status: "approved"},{new:true})
        // findByIdAndUpdate can also be used here
        res.status(200).json({
            message: "Book approved",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went Wrong",
            details: error.message
        })
    }
    

}

exports.getHomeBooks = async (req, res) => {
    console.log('Get books');
    try {
        const bookList = await books.find().sort({ _id: -1 }).limit(4)
        res.status(200).json(bookList)
    } catch (error) {
        res.status(500).json({
            status: "Server error",
            message: error.message
        })
    }
}

exports.getAllBooksController = async (req, res) => {
    const sellerEmail = req.email
    const searchKey = req.query.search
    console.log(searchKey);
    

    try {
        const result = await books.find({ sellerEmail: { $ne: sellerEmail }, bookTitle: {$regex: searchKey,$options: "i"} })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            error: "server error",
            details: error.message
        })
    }
}

exports.viewBookController = async (req, res) => {
    const { id } = req.params
    try {
        const result = await books.findById({ _id: id })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


//get books uploaded by user
exports.getUserUploadedBooks = async (req, res) => {
    const sellerEmail = req.email
    try {
        const result = await books.find({ sellerEmail })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getPurchaseHistory = async (req, res) => {
    const email = req.email
    try {
        const result = await books.find({ boughtBy: email })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteBookController = async (req, res) => {
    const { bookID } = req.params

    try {
        const result = await books.findByIdAndDelete({ _id: bookID })
        res.status(200).json({
            message: "Book deleted successfully",
            bookDetails: result
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Book delete error",
            bookDetails: error.message
        })
    }
}

//admin: get all books
exports.getAllBooksAdminController = async (req, res) => {
    const sellerEmail = req.email
    try {
        const result = await books.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            error: "server error",
            details: error.message
        })
    }
}

//genAi

exports.generateBookAbstractController = async (req,res) => {
    try {
        const {bookTitle} = req.body
        console.log(bookTitle);
        
        console.log('Inside genAI');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)

        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash-lite"
        })

        const result = await model.generateContent(`Give me a short abstract of the book ${bookTitle}  without formatting, to be displayed on a bookstore website `)
        console.log(result.response);

        
        res.status(200).json({
            status: "generated",
            bookTitle,
            message: result.response.candidates[0].content.parts[0].text,
            fullResponse: result.response
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}