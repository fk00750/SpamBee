const CustomErrorHandler = require("../../utils/custom.error.handler")
const IssueAccessAndRefreshToken = require("../../utils/jwt/issue.jwt.token")
const { TokenManager } = require("../../utils/token.manager")

const tokenManager = new TokenManager()

/**
 * @async
 * @function RefreshTokenHanlder
 * @description Handle token management
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during registration.
 * @returns {Response} returns a JSON response with status and message.
 */
exports.RefreshTokenHanlder = async (req, res, next) => {
    try {
        const user = req.user
        const refreshToken = req.token

        // check existing refresh token
        const existingRefreshToken = await tokenManager.findRefreshToken(refreshToken)

        // check token validity
        if (!existingRefreshToken || existingRefreshToken.status !== true || existingRefreshToken.expiresAt < Math.floor(Date.now() / 1000))
            return next(CustomErrorHandler.unAuthorized("Invalid refresh token **"))

        // update the status of existing token to invalid
        const isExistingTokenUpdated = await tokenManager.updateRefreshToken(refreshToken, user.userId)

        if (!isExistingTokenUpdated) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        // delete all the previous refresh token of the user
        const isExistingTokenDeleted = await tokenManager.deleteExistingRefreshTokens(user.userId)

        if (!isExistingTokenDeleted) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        // issue new access and refresh token
        const newAccessToken = await IssueAccessAndRefreshToken.issueAccessToken(user.userId)
        const newRefreshToken = await IssueAccessAndRefreshToken.issueRefreshToken(user.userId)

        if (!newAccessToken || !newRefreshToken) return next(CustomErrorHandler.somethingWentWrong())

        const decode = await tokenManager.decodeToken(newRefreshToken)

        if (!decode) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        const { exp: expiresAt } = decode

        // store new refresh token
        const storeNewRefreshToken = await tokenManager.storeRefreshToken(newRefreshToken, user.userId, user.id, expiresAt)

        if (!storeNewRefreshToken) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        return res.status(200).json({
            success: true,
            message: 'success',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Token > index.js > TokenHandler - ${error.message}`)
        next(error)
    }
}