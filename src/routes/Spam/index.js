const express = require("express")
const { SpamNumber } = require("../../controllers/Spam")
const Router = express.Router()
const passport = require('passport')
const { validateRequest, validatePhone } = require("../../middlewares/validators")

Router
    .post('/mark-spam', validateRequest, validatePhone, passport.authenticate('jwt-access'), SpamNumber)

module.exports = Router