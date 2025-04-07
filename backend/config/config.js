const mongoose = require('mongoose');
require('dotenv').config(); //Load environment variable

//Destructure environment variables
const {PORT, MONGO_URI, SECRET_KEY} = process.env

// Database connection function
const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    }catch(error){
        console.log(`MongoDB connection Error: ${error.message}`);
        process.exit(1)
    }
};

module.exports = {connectDB, PORT, MONGO_URI, SECRET_KEY};