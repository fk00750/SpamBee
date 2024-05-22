const db = require("../models")

class ProfileManager {
    async updateEmail(email, userId) {
        try {
            if (!userId || !email) return undefined

            const result = await db.User.update(
                { email: email },
                { where: { userId: userId }, returning: true }
            )

            if (!result) return false

            return result
        } catch (error) {
            console.log(`utils > profile.manager.js > ProfileManager > updateEmail: ${error.message}`)
            return error
        }
    }

    async updatePhone(phone, userId) {
        try {
            if (!phone) return undefined

            const result = await db.User.update(
                { phone: phone },
                { where: { userId: userId } }
            )

            if (!result) return false

            return result
        } catch (error) {
            console.log(`utils > profile.manager.js > ProfileManager > updatePhone: ${error.message}`)
            return error
        }
    }

    async updateName(name, userId) {
        try {
            if (!name) return undefined

            const result = await db.User.update(
                { name: name },
                { where: { userId: userId } }
            )

            if (!result) return false

            return result
        } catch (error) {
            console.log(`utils > profile.manager.js > ProfileManager > updateUsername: ${error.message}`)
            return error
        }
    }

    async updatePassword(password, userId) {
        try {
            if (!password) return undefined

            const result = await db.User.update(
                { password: password },
                { where: { userId: userId } }
            )

            if (!result) return false

            return result
        } catch (error) {
            console.log(`utils > profile.manager.js > ProfileManager > updatePassword: ${error.message}`)
            return error
        }
    }
}

module.exports = { ProfileManager }