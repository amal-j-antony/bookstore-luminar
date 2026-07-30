//import all packages
//1. loads .env file contents into process.env by default
// const dotenv = require("dotenv")
// dotenv.config()

require("dotenv").config()
// 2. import express
const express = require("express")

//3. import cors
const cors = require("cors")

// import routes
const router = require("./routes/allRoutes")

//4. Create server using express package
const bookstoreServer = express()

// import mongodb connection config
require("./config/dbconnection")

// 5. enable cors in server
bookstoreServer.use(cors())

// parse json into js
bookstoreServer.use(express.json())

bookstoreServer.use((err ,req ,res ,next) => {
    res.status(500).json(err)
})

// use routes
bookstoreServer.use(router)

// static
bookstoreServer.use("/uploads",express.static("./uploads"))

// 6. setup port number to run the server in browser
const PORT = process.env.PORT

// 7. Start server to listen for client requests to port/from server in internet
bookstoreServer.listen(PORT, ()=>{
    console.log(`Server started running at ${PORT}`);
})

//GET
// bookstoreServer.get("/",(req,res)=>{
//     res.status(200).send(`<h1>Server started , waiting for requests</h1>`)
// })

//POST
// bookstoreServer.post("/",(req,res)=> {
//     res.status(201).send(`<h1>Post request received</h1>`)
// })