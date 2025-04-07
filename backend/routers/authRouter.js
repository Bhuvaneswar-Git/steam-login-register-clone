const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router()

// Creating an instance of the AuthController class
const auth_Controller = new AuthController;

router.post('/register', auth_Controller.register)
router.post('/login', auth_Controller.login)

module.exports = router;