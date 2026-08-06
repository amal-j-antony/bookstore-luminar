// user register
const users = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { findByIdAndUpdate } = require("../models/bookModel");


exports.registerController = async (req, res) => {
    console.log("Inside register function");
    console.log(req.body);
    const { username, email, password } = req.body

    //check email in DB
    const existingUser = await users.findOne({ email: email })
    if (existingUser) {

        return res.status(409).json('User already exists')

    } else {
        const encryptedPw = await bcrypt.hash(password, 10)
        const newUser = await users.create({
            username,
            email,
            password: encryptedPw
        })
        res.status(201).json(newUser)
    }

    res.status(201).json('Register Request Received', req.body)
}

//user login
exports.loginController = async (req, res) => {
    console.log('Inside login function');
    const { email, password } = req.body
    const existingUser = await users.findOne({ email })
    console.log(existingUser);

    if (existingUser) {
        const isPswdMatch = bcrypt.compare(password, existingUser.password)

        if (isPswdMatch) {
            const token = jwt.sign({ usermail: email, role: existingUser.role }, "sheepCalmCapy")
            res.status(200).json({ user: existingUser, token })
            return
        } else {
            res.status(409).json("Invalid Credentials")
            return
        }
    } else {
        res.status(400).json("Account does not exist, please register")
        return
    }


}

//update user profile
exports.updateUserController = async (req, res) => {
    console.log("Inside update user profile controller");
    console.log(req.body);
    console.log(req.file);
    console.log(req.params);

    try {
        const email = req.email
        const updateData = {}
        const { username, password, bio, profileImage } = req.body
        if (email) {
            updateData.email = email
        }
        if (username) { updateData.username = username }

        if (bio) { updateData.bio = bio }

        if (password) {
            const encryptedPw = password && await bcrypt.hash(password, 10)
            updateData.password = encryptedPw
        }

        if (req.file) {
            updateData.profileImage = req.file.filename
        }

        // const updateImage = req.file ? req.file.filename : profileImage 
        const { id } = req.params

        const result = await users.findByIdAndUpdate({ _id: id }, updateData, { new: true });
        console.log(result);
        const message = {
            message: "success",
            details: result
        }

        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            details: error
        })
    }
}

exports.getAllUsersController = async (req, res) => {
    try {
        const data = await users.find({ role: { $ne: "admin" } })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong",
            details: error.message
        })
    }
}

exports.updateAdminController = async (req, res) => {
    const { id } = req.params
    const updateData = {}
    const { username, password, profileImage } = req.body
    console.log(req.body, req.params);

    if (username) {
        updateData.username = username
    }
    if (password) {
        updateData.password = await bcrypt.hash(password, 10)
    }
    if (req.file) {
        updateData.profileImage = req.file.filename
    }
    try {
        const result = await users.findByIdAndUpdate({ _id: id }, updateData, { returnDocument: "after" })
        res.status(200).json({
            status: "success",
            details: result
        })
    } catch (error) {
        res.status(500).json({
            status: "Error: Something went wrong",
            details: error.message
        })
    }
}

//google controller
exports.googleAuthCOntroller = async (req, res) => {
    const { email, username, profileImage } = req.body
    console.log(req.body);
    
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ usermail: existingUser.email, role: existingUser.role }, "sheepCalmCapy")
            res.status(200).json({
                existingUser: existingUser, token
            })
        } else {
            const password= await bcrypt.hash(crypto.randomUUID(),10)
            const newUser = await users.create({
                username, email, password, profileImage, authProvider: "google"
            })
            const token = jwt.sign({ usermail: email, role:newUser.role }, "sheepCalmCapy")
            res.status(200).json({
                existingUser: newUser, token
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "server error",
            message: error.message
        })
        
        
    }
}
