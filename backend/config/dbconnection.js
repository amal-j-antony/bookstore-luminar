const mongoose = require("mongoose")
const DBconnectionString = process.env.mongoDBconnectionString

mongoose.connect(DBconnectionString).then(res => {
    console.log("Connection successful");
    
}).catch(err => {
    console.log("Connection failed",err);
    
})