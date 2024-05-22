const { ContactManger } = require("../../utils/contact.manager")
const CustomErrorHandler = require("../../utils/custom.error.handler")

const contactManager = new ContactManger()

/**
 * @async
 * @function GetContacts
 * @description Get all contacts for the registered (authenticated) user.
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during get contacts process.
 * @returns {Response} returns a JSON response with all contacts.
 */
exports.GetContacts = async (req, res, next) => {
    try {
        const user = req.user

        // get all contact with userId
        const Contacts = await contactManager.retrieveAllContacts(user.userId)

        // if contacts not found response with error that contacts not found
        if (!Contacts) return next(CustomErrorHandler.notFound("contacts not found"))

        // response with status 200 and all contacts
        return res.status(200).json({
            Contacts: Contacts
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Contact > index.js > GetContacts - ${error.message}`)
        next(error)
    }
}

/**
 * @async
 * @function GetContacts
 * @description Get single contacts for the registered (authenticated) user.
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during get contact process.
 * @returns {Response} returns a JSON response with a single contacts.
 */
exports.GetContact = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId

        // get contact with userId and contactId
        const Contact = await contactManager.findContactById(user.userId, contactId)

        // if contact not found, response with error that contact not found
        if (!Contact) return next(CustomErrorHandler.notFound("contact not found"))

        // response with status 200 and contact
        return res.status(200).json({
            Contact: Contact
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Contact > index.js > GetContact - ${error.message}`)
        next(error)
    }
}

/**
 * @async
 * @function GetContacts
 * @description Add a new contact for the registered (authenticated) user.
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during get contacts process.
 * @returns {Response} returns a JSON response status code and message.
 */
exports.AddContact = async (req, res, next) => {
    try {
        const user = req.user
        const { name, phone } = req.body

        // check if the phone number already exists
        const contact = await contactManager.findContactByNumber(phone, user.userId)

        // if phone number already exists response with error that contact already exists
        if (contact) return next(CustomErrorHandler.alreadyExist("contact already exist"))

        // add new contact with name, phone, userId and user referrance id
        const isContactAdded = await contactManager.addContact(name, phone, user.userId, user.id)

        // if add contact process failed, response with error that something went wrong and unable to add contact
        if (!isContactAdded) return next(CustomErrorHandler.somethingWentWrong("unable to add contact"))

        // response with status 200 and success message
        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Contact > index.js > AddContact - ${error.message}`)
        next(error)
    }
}

/**
 * @async
 * @function DeleteContact
 * @description Delete a particular contact by contactId for registered (authenticated) user.
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during delete contact process.
 * @returns {Response} returns a JSON response with deleted contact status and message.
 */
exports.DeleteContact = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId

        // delete the contact by contactId for specific user (user.userId)
        const Contact = await contactManager.deleteContact(user.userId, contactId)

        // If contact deletion fails, response with an error that something went wrong 
        if (!Contact) return next(CustomErrorHandler.notFound("unable to delete contact"))

        // response with deleted contact status 1 and message
        return res.status(200).json({
            Contact: Contact,
            message: 'success'
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Contact > index.js > DeleteContact - ${error.message}`)
        next(error)
    }
}

/**
 * @async
 * @function UpdateContact
 * @description Update a particular contact by contactId for registered (authenticated) user.
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during update contact process.
 * @returns {Response} returns a JSON response with updated contact status and message.
 */
exports.UpdateContact = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const name = req.body.name
        const phone = req.body.phone

        // update the contact by contactId for specific user (user.userId)
        const Contact = await contactManager.updateContact(user.userId, contactId, name, phone)

        // If contact updation fails, response with an error that something went wrong 
        if (!Contact) return next(CustomErrorHandler.notFound("unable to update contact"))

        // response with updated contact status 1 and message
        return res.status(200).json({
            Contact: Contact,
            message: 'success'
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Contact > index.js > UpdateContact - ${error.message}`)
        next(error)
    }
}