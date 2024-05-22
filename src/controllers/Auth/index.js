'use strict';

const { AuthManager } = require("../../utils/auth.manager");
const { TokenManager } = require("../../utils/token.manager");
const CustomErrorHandler = require("../../utils/custom.error.handler");
const authManger = new AuthManager()
const tokenManager = new TokenManager()
const IssueAccessAndRefreshToken = require('../../utils/jwt/issue.jwt.token');

/**
 * @async
 * @function Register
 * @description Handle user registration process
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Function} next - next middleware function.
 * @throws {Error} In case of any error during registration.
 * @returns {Response} returns a JSON response with status and message.
 */
exports.Register = async (req, res, next) => {
    try {
        // get name, phone and password from req.body
        const { name, phone, password } = req.body

        if (!name || !phone || !password) return next(new CustomErrorHandler(400, "Invalid request"))

        // check if user already exists in the database
        const user = await authManger.findUserByPhoneNumber(phone)

        // if user already exists in the database, response with an error that user already exists
        if (user) return next(CustomErrorHandler.alreadyExist("user already exist"))

        // create new user with name, phone and password
        const isUserCreated = await authManger.createUser(name, phone, password)

        // If user creation fails, response with an error that something went wrong 
        if (!isUserCreated) return next(CustomErrorHandler.somethingWentWrong())

        // if user creation successfull, response with status code 200 and success message
        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        // log the error and pass it to error handler middleware
        console.log(`Error: src > controllers > Auth > index.js > Register - ${error.message}`)
        next(error)
    }
}

exports.Login = async (req, res, next) => {
    try {
        const { phone, password } = req.body

        if (!phone || !password) return next(new CustomErrorHandler(400, "Invalid request"))

        const user = await authManger.findUserByPhoneNumber(phone)

        if (!user) return next(CustomErrorHandler.notFound("user not found"))

        const isPasswordValid = await authManger.verifyPassword(password, user.password)

        if (!isPasswordValid) return next(CustomErrorHandler.wrongCredentials("Invalid Password"))

        // find and delete existing refresh token
        const existingRefreshToken = await tokenManager.findRefreshTokenById(user.userId)
        if (existingRefreshToken) await tokenManager.deleteExistingRefreshTokens(user.userId)

        const accessToken = await IssueAccessAndRefreshToken.issueAccessToken(user.userId)
        const refreshToken = await IssueAccessAndRefreshToken.issueRefreshToken(user.userId)

        if (!accessToken || !refreshToken) return next(CustomErrorHandler.somethingWentWrong())

        const decode = await tokenManager.decodeToken(refreshToken)

        if (!decode) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        const { exp: expiresAt } = decode

        // store new refresh token
        const storeNewRefreshToken = await tokenManager.storeRefreshToken(refreshToken, user.userId, user.id, expiresAt)

        if (!storeNewRefreshToken) return next(CustomErrorHandler.somethingWentWrong("unable to refresh the token"))

        return res.status(200).json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            message: "Login Successfully",
        });
    } catch (error) {
        console.log(`Error: src > controllers > Auth > index.js > Register - ${error.message}`)
        next(error)
    }
}
