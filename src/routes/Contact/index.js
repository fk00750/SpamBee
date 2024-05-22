const express = require('express')
const { GetContacts, GetContact, AddContact, DeleteContact, UpdateContact } = require('../../controllers/Contact')
const { validateRequest, validatePhone, validateName, validateAuthToken } = require('../../middlewares/validators')
const passport = require('passport')
const Router = express.Router()

Router
    .get('/get-contacts', passport.authenticate('jwt-refresh'),validateAuthToken, GetContacts)
    .get('/get-contact/:contactId', passport.authenticate('jwt-refresh'),validateAuthToken, GetContact)
    .post('/add-contact', validateRequest, validateName, validatePhone, passport.authenticate('jwt-access'), AddContact)
    .delete('/delete-contact/:contactId', passport.authenticate('jwt-access'), DeleteContact)
    .patch('/update-contact/:contactId', validateRequest, passport.authenticate('jwt-access'), UpdateContact)

module.exports = Router