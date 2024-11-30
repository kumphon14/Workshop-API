const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://kajohnponfff:TN3DbfczpNKblDH9@cluster0.2ekyz.mongodb.net/')
        console.log("Connected MongoDB")
    }catch (err){
        console.log(err)
    }
}

module.exports = connectDB