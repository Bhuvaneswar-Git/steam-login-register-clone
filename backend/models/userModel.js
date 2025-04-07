const mongoose = require('mongoose');

//Define user Schema
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match:[
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address",
        ]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6,"Password must be at least 6 characters"],
    }
}, { timestamps:true });

// Creating Model ( MongoDB collection:"users" )
const User = mongoose.model("User", UserSchema, 'users')

module.exports = User;