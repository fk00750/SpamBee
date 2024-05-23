/**
 * @file contact.manager.js
 * @description manages the following opertions: get contacts, add contact, delete cotact and update contact
 */

const db = require("../models")
const { AuthManager } = require("./auth.manager")
const CustomErrorHandler = require("./custom.error.handler")
const authManager = new AuthManager()

/**
 * @class Contact Manager
 * @description Manage contacts
 */
class ContactManger {
    /**
     * @async
     * @method findContactByNumber
     * @description Find contacts by phone number.
     * @param {string} phone - phone number.
     * @param {string} userId - user Id of the user.
     * @throws {Error} if something went wrong during the search.
     * @returns {Object|boolean|undefined} If phone not provided returns undefined, if contact not found return false, if contact found return contact.
    */
    async findContactByNumber(phone, userId) {
        try {
            if (!phone) return undefined

            const contact = await db.Contact.findOne({
                where: { phone, userId }
            })

            if (!contact) return false

            return contact
        } catch (error) {
            console.log(`utils > contact.manager.js > ContactManger > findUserByPhoneNumber: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method findContactById
     * @description Find contacts by contact id.
     * @param {string} userId - user Id of the user.
     * @param {string} contactId - contact id.
     * @throws {Error} if something went wrong during the search.
     * @returns {Object|boolean|undefined} If user id or contact id not provided returns undefined, if contact not found return false, if contact found return contact.
    */
    async findContactById(userId, contactId) {
        try {
            if (!userId || !contactId) return undefined

            const contact = await db.Contact.findOne({
                where: { userId, contactId },
                attributes: ['name', 'phone', 'email','contactId']
            })

            if (!contact) return false

            return contact
        } catch (error) {
            console.log(`utils > contact.manager.js > ContactManger > findUserByPhoneNumber: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method retrieveAllContacts
     * @description Find all contacts by user id.
     * @param {string} userId - user Id of the user.
     * @throws {Error} if something went wrong during the search.
     * @returns {Array|boolean|undefined} If user id not provided returns undefined, if contact not found return false, if contact found return contact array.
     */
    async retrieveAllContacts(userId) {
        if (!userId) return undefined

        const result = await db.Contact.findAll(
            {
                where: { userId: userId },
                attributes: ['name', 'phone', 'contactId']
            }
        )

        if (!result || result.length === 0) return false

        return result
    }

    /**
     * @async
     * @method addContact
     * @description add new contact with name, phone, userId(userId), user referrance id (userId_ref).
     * @param {string} name - contact name.
     * @param {string} phone - contact phone.
     * @param {string} userId - user Id of the user (user.userId).
     * @param {number} userId_ref - user referrance id (user.id).
     * @throws {Error} if something went wrong during addition of contact.
     * @returns {Object|null|undefined} If name or phone or userId or userId_ref not provided returns undefined, if contact add process failed returns null.
     */
    async addContact(name, phone, userId, userId_ref) {
        try {
            if (!name || !phone || !userId || !userId_ref) return undefined

            let email

            // check if contact exist in user database
            const user = await authManager.findUserByPhoneNumber(phone)

            if (user) email = user.email

            const contactId = await authManager.createUniqueId('contact')

            if (!contactId) return null

            const contact = await db.Contact.create({
                userId_ref: userId_ref,
                userId: userId,
                contactId: contactId,
                name: name,
                phone: phone,
                email: email
            })

            if (!contact) return null

            return contact
        } catch (error) {
            console.log(`utils > contact.manager.js > ContactManger > addContact: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method deleteContact
     * @description Find contacts by contact id.
     * @param {string} userId - user Id of the user.
     * @param {string} contactId - contact id.
     * @throws {Error} if something went wrong during the delete process.
     * @returns {number|boolean|undefined} If user id or contact id not provided returns undefined, if contact delete process failed returns null and if contact deleted return number of rows.
     */
    async deleteContact(userId, contactId) {
        try {
            if (!userId || !contactId) return undefined

            const isContactDeleted = await db.Contact.destroy(
                {
                    where: { userId: userId, contactId: contactId }
                }
            )

            if (!isContactDeleted) throw null

            return isContactDeleted
        } catch (error) {
            console.log(`utils > contact.manager.js > ContactManger > deleteContact: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method updateContact
     * @description Update the contact by userId and contactId
     * @param {string} userId - user Id of the user.
     * @param {string} contactId - contact id.
     * @param {string} name - new name.
     * @param {string} phone - new phone.
     * @throws {Error} if something went wrong during the update process.
     * @returns {number|boolean|undefined} If user id or contact id not provided returns undefined, if contact update process failed returns null and if contact updated return number of rows.
     */
    async updateContact(userId, contactId, name, phone) {
        try {
            if (!userId || !contactId) return undefined

            let fieldToUpdate = {}

            if (name) fieldToUpdate.name = name
            if (phone) fieldToUpdate.phone = phone

            if (Object.keys(fieldToUpdate).length === 0) return undefined

            const result = await db.Contact.update(fieldToUpdate, {
                where: { userId, contactId }
            })

            if (!result || result[0] === 0) return null

            return result[0]
        } catch (error) {
            console.log(`utils > contact.manager.js > ContactManger > updateContact: ${error.message}`)
            return error
        }
    }
}

module.exports = { ContactManger }