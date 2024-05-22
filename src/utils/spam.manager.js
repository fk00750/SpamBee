const db = require("../models")
const { AuthManager } = require("./auth.manager")
const authManager = new AuthManager()

class SpamManager {
    async findSpamNumber(phone, spammedById) {
        try {
            if (!phone) return undefined

            const spam = await db.Spam.findOne({
                where: { phone: phone, spammedById: spammedById }
            })

            if (!spam) return null

            return spam
        } catch (error) {
            console.log(`src > utils > spam.manager.js > SpamManager > findSpamNumber: ${error.message}`)
            throw error
        }
    }
    async markNumberSpam(id, userId, phone) {
        try {
            if (!userId || !phone) return undefined

            const spamId = await authManager.createUniqueId('spam')

            if (!spamId) return null

            const spam = await db.Spam.create({
                spamId: spamId,
                phone: phone,
                spammedBy_ref: id,
                spammedById: userId,
            })

            if (!spam) return null

            return spam
        } catch (error) {
            console.log(error)
            console.log(`src > utils > spam.manager.js > SpamManager > markNumberSpam: ${error.message}`)
            throw error
        }
    }
}

module.exports = { SpamManager }