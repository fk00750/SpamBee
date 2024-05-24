const express = require('express')
const { Register, Login } = require('../../controllers/Auth')
const { validatePhone, validatePassword } = require('../../middlewares/validators')
const Router = express.Router()

Router
    .post('/register', validatePhone, validatePassword, Register)
    .post('/login', validatePhone, validatePassword, Login)

module.exports = Router