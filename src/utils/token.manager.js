const { decode } = require("jsonwebtoken")
const db = require("../models")

class TokenManager {
    /**
     * @async
     * @method findRefreshToken
     * @param {string} refreshToken
     * @returns {undefined|object} existing refresh token
     */
    async findRefreshToken(refreshToken) {
        try {
            if (!refreshToken) return undefined

            const token = await db.Refresh.findOne({
                where: { refreshToken: refreshToken, status: true }
            })

            if (!token) return false

            return token
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > findRefreshToken: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method findRefreshToken
     * @param {string} refreshToken
     * @returns {undefined|object} existing refresh token
     */
    async findRefreshTokenById(userId) {
        try {
            if (!userId) return undefined

            const token = await db.Refresh.findOne({
                where: { userId: userId }
            })

            if (!token) return false

            return token
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > findRefreshTokenById: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method updateRefreshToken
     * @param {string} refreshToken
     * @returns {object} existing refresh token
     */
    async updateRefreshToken(refreshToken, userId) {
        try {
            if (!userId || !refreshToken) return undefined

            const result = await db.Refresh.update(
                { status: false },
                { where: { userId, refreshToken } }
            )

            if (!result || result[0] === 0) return null

            return result[0]
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > updateRefreshToken: ${error.message}`)
            throw error
        }
    }


    /**
     * @async
     * @method updateRefreshToken
     * @param {string} refreshToken
     * @returns {object} existing refresh token
     */
    async deleteExistingRefreshTokens(userId) {
        try {
            if (!userId) return undefined

            const result = await db.Refresh.destroy(
                {
                    where: { userId: userId }
                }
            )

            if (!result) throw null

            return result
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > deleteAllRefreshToken: ${error.message}`)
            throw error
        }
    }

    async decodeToken(token) {
        try {
            if (!token) return undefined

            const decodedToken = decode(token, { complete: true })

            if (!decodedToken) return null

            const { payload } = decodedToken

            if (payload) return payload
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > decodeToken: ${error.message}`)
            throw error
        }
    }

    async storeRefreshToken(refreshToken, userId, userId_ref, expiresAt) {
        try {
            if (!refreshToken || !userId || !userId_ref || !expiresAt) return undefined

            const result = db.Refresh.create({
                userId_ref: userId_ref,
                userId: userId,
                refreshToken: refreshToken,
                expiresAt: expiresAt,
                status: true
            })

            if (!result) return null

            return result
        } catch (error) {
            console.log(`utils > refresh.manager.js > TokenManager > storeRefreshToken: ${error.message}`)
            throw error
        }
    }
}

module.exports = { TokenManager }