const db = require("../models")

/**
 * @class ProfileManager
 * @description Class responsible for managing user profile updates such as email, phone, name, and password.
 */
class ProfileManager {
    /**
     * @async
     * @method updateEmail
     * @description Update the email address of the user with the given userId.
     * @param {string} email - The new email address.
     * @param {string} userId - The ID of the user whose email is to be updated.
     * @throws {Error} In case of any error during email update process.
     * @returns {Promise<Object|boolean|undefined>} Returns the result object, false if update fails, or undefined if parameters are invalid.
     */
    async updateEmail(email, userId) {
        try {
            if (!userId || !email) return undefined

            // Update the user's email in the database.
            const result = await db.User.update(
                { email: email },
                { where: { userId: userId }, returning: true }
            )

            // If result is null, return false indicating update failure.
            if (!result) return false

            // Return the result object of the update operation.
            return result
        } catch (error) {
            // Log the error and return the error object.
            console.log(`utils > profile.manager.js > ProfileManager > updateEmail: ${error.message}`)
            return error
        }
    }

    /**
     * @async
     * @method updatePhone
     * @description Update the phone number of the user with the given userId.
     * @param {string} phone - The new phone number.
     * @param {string} userId - The ID of the user whose phone number is to be updated.
     * @throws {Error} In case of any error during phone update process.
     * @returns {Promise<Object|boolean|undefined>} Returns the result object, false if update fails, or undefined if parameters are invalid.
     */
    async updatePhone(phone, userId) {
        try {
            if (!phone) return undefined

            // Update the user's phone number in the database.
            const result = await db.User.update(
                { phone: phone },
                { where: { userId: userId } }
            )

            // If result is null, return false indicating update failure.
            if (!result) return false

            // Return the result object of the update operation.
            return result
        } catch (error) {
            // Log the error and return the error object.
            console.log(`utils > profile.manager.js > ProfileManager > updatePhone: ${error.message}`)
            return error
        }
    }

    /**
     * @async
     * @method updateName
     * @description Update the name of the user with the given userId.
     * @param {string} name - The new name.
     * @param {string} userId - The ID of the user whose name is to be updated.
     * @throws {Error} In case of any error during name update process.
     * @returns {Promise<Object|boolean|undefined>} Returns the result object, false if update fails, or undefined if parameters are invalid.
     */
    async updateName(name, userId) {
        try {
            if (!name) return undefined

            // Update the user's name in the database.
            const result = await db.User.update(
                { name: name },
                { where: { userId: userId } }
            )

            // If result is null, return false indicating update failure.
            if (!result) return false

            // Return the result object of the update operation.
            return result
        } catch (error) {
            // Log the error and return the error object.
            console.log(`utils > profile.manager.js > ProfileManager > updateName: ${error.message}`)
            return error
        }
    }

    /**
     * @async
     * @method updatePassword
     * @description Update the password of the user with the given userId.
     * @param {string} password - The new password.
     * @param {string} userId - The ID of the user whose password is to be updated.
     * @throws {Error} In case of any error during password update process.
     * @returns {Promise<Object|boolean|undefined>} Returns the result object, false if update fails, or undefined if parameters are invalid.
     */
    async updatePassword(password, userId) {
        try {
            if (!password) return undefined

            // Update the user's password in the database.
            const result = await db.User.update(
                { password: password },
                { where: { userId: userId } }
            )

            // If result is null, return false indicating update failure.
            if (!result) return false

            // Return the result object of the update operation.
            return result
        } catch (error) {
            // Log the error and return the error object.
            console.log(`utils > profile.manager.js > ProfileManager > updatePassword: ${error.message}`)
            return error
        }
    }
}

module.exports = { ProfileManager }
