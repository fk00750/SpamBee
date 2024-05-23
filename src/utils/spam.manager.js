const db = require("../models")
const { AuthManager } = require("./auth.manager")
const authManager = new AuthManager()

/**
 * @class SpamManager
 * @description Class responsible for managing spam-related operations such as finding and marking phone numbers as spam.
 */
class SpamManager {
    /**
     * @async
     * @method findSpamNumber
     * @description Find a spam record for a specific phone number and user.
     * @param {string} phone - The phone number to be checked.
     * @param {string} spammedById - The ID of the user who marked the number as spam.
     * @throws {Error} In case of any error during the search for spam number.
     * @returns {Promise<Object|null|undefined>} Returns the spam record if found, null if not found, or undefined if parameters are invalid.
     */
    async findSpamNumber(phone, spammedById) {
        try {
            if (!phone) return undefined

            // Find the spam record for the given phone number and user.
            const spam = await db.Spam.findOne({
                where: { phone: phone, spammedById: spammedById }
            })

            // If spam record is not found, return null.
            if (!spam) return null

            // Return the found spam record.
            return spam
        } catch (error) {
            // Log the error and rethrow it.
            console.log(`src > utils > spam.manager.js > SpamManager > findSpamNumber: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method markNumberSpam
     * @description Mark a specific phone number as spam by a user.
     * @param {string} id - The ID reference for the spam action.
     * @param {string} userId - The ID of the user marking the number as spam.
     * @param {string} phone - The phone number to be marked as spam.
     * @throws {Error} In case of any error during the spam marking process.
     * @returns {Promise<Object|null|undefined>} Returns the created spam record, null if creation fails, or undefined if parameters are invalid.
     */
    async markNumberSpam(id, userId, phone) {
        try {
            if (!userId || !phone) return undefined

            // Create a unique spam ID.
            const spamId = await authManager.createUniqueId('spam')

            // If spam ID creation fails, return null.
            if (!spamId) return null

            // Create a new spam record in the database.
            const spam = await db.Spam.create({
                spamId: spamId,
                phone: phone,
                spammedBy_ref: id,
                spammedById: userId,
            })

            // If spam record creation fails, return null.
            if (!spam) return null

            // Return the created spam record.
            return spam
        } catch (error) {
            // Log the error and rethrow it.
            console.log(`src > utils > spam.manager.js > SpamManager > markNumberSpam: ${error.message}`)
            throw error
        }
    }
}

module.exports = { SpamManager }
