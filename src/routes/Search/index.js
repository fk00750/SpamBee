const express = require('express')
const { SearchByNameOrPhone } = require('../../controllers/Search')
const passport = require('passport')
const { validateAuthToken } = require('../../middlewares/validators')
const Router = express.Router()

Router.get('/search-user', passport.authenticate('jwt-refresh'), validateAuthToken, SearchByNameOrPhone)

module.exports = Router