const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const URL = process.env.MONGO_URL;

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

const db = mongoose.connection;

db.on("connected", ()=> {
    console.log("connection with Database established successful")
})
db.on("disconnected", ()=> {
    console.log("connection with Database established Unsuccessful")
})
db.on("error", (err)=> {
    console.log("error occurred while connecting...",err);
})

module.exports = db;  