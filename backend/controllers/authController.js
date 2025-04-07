const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
// Use CryptoJS for encryption
const CryptoJS = require('crypto-js');

const {SECRET_KEY} = require('../config/config');

class AuthController {

    // Register
    async register (req,res){
        try {
            const {email, password} = req.body

            // Validate require field
            if(!email || !password){
                return res.status(400).json({message:'All fields are required'});
            }

            // Check if user already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(409).json({message: 'User already exists'})
            }

            // Encrypt the password using CryptoJS
            const encryptedPassword  = CryptoJS.AES.encrypt(password, SECRET_KEY).toString()

            // Create new user
            const user = new User({
                email,
                password: encryptedPassword
            });

            await user.save()

            // Send response for frontend notification (toaster)
            return res.status(201).json({ message: "Registration successful! 🎉" });

        } catch (error) {
            console.error("Error in user registration:", error);
            return res.status(500).json({ message: "Server error. Please try again." });
        }
    }

    // Login
    async login(req,res){

        try {
            
            const {email, password} = req.body;

            // Validate require field
            if(!email || !password){
                return res.status(401).json({ error: "All fields are required" });
            };

            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Decrypt password
            let decryptedPassword;
            try {
                const bytes = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
                decryptedPassword = bytes.toString(CryptoJS.enc.Utf8).trim(); // Trim to avoid encoding issues
            } catch (error) {
                console.error("Decryption error:", error.message);
                return res.status(500).json({ error: "Error decrypting password. Please try again." });
            }

            // Compare passwords
            if (password.trim() !== decryptedPassword) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Create JWT token
            const expireIn = 10; // Token expiry time in minutes
            const token = jwt.sign(
                { id: user._id, email: user.email }, // Payload
                SECRET_KEY, // Secret key
                { expiresIn: expireIn + "m" } // Expiration time
            );

            // Calculate expiration time (milliseconds) and set it in local storage
            const tokenExpiration = Date.now() + expireIn * 60 * 1000;

            // Send token and user info in the response
            res.status(200).json({
                message: "Login Successful",
                token,
                email: user.email,
                tokenExpiration, //Include expiration in response
            });

        } catch (error) {
            console.error("Error in user login:", error);
            return res.status(500).json({ error: "Server error. Please try again." });
        }
    }

};  

module.exports = AuthController;