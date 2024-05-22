const express = require('express')
const { updateEmail, updatePhone, updatePassword, updateName, Profile } = require('../../controllers/Profile')
const passport = require('passport')
const { validateTempMail, validateEmail, validatePhone, validatePassword, validateRequest, validateAuthToken } = require('../../middlewares/validators')
const Router = express.Router()

Router
    .get('/get-profile', passport.authenticate('jwt-refresh'), validateAuthToken, Profile)
    .patch('/update-email', validateRequest, validateTempMail, validateEmail, passport.authenticate('jwt-access'), updateEmail)
    .patch('/update-phone', validateRequest, validatePhone, passport.authenticate('jwt-access'), updatePhone)
    .patch('/update-name', validateRequest, passport.authenticate('jwt-access'), updateName)
    .patch('/update-password', validateRequest, validatePassword, passport.authenticate('jwt-access'), updatePassword)

module.exports = Router