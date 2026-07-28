// user register
const users = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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
