const express = require('express')
const { RefreshTokenHanlder } = require('../../controllers/Token')
const Router = express.Router()
const passport = require('passport')
const { validateAuthToken } = require('../../middlewares/validators')

Router.post('/refresh', passport.authenticate('jwt-refresh'), validateAuthToken, RefreshTokenHanlder)

module.exports = Router