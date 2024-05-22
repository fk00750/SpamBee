'use strict';

const { AuthManager } = require("../../utils/auth.manager");
const CustomErrorHandler = require("../../utils/custom.error.handler");
const { ProfileManager } = require("../../utils/profile.manager");

const profileManger = new ProfileManager()
const authManger = new AuthManager()

exports.Profile = async (req, res, next) => {
    try {
        const user = req.user

        return res.status(200).json({
            name: user.name,
            phone: user.phone,
            email: user.email,
        })
    } catch (error) {
        console.log(`Error: src > controllers > Profile > index.js > dashboard - ${error.message}`)
        next(error)
    }
}

exports.updateEmail = async (req, res, next) => {
    try {
        const user = req.user
        const email = req.body.email

        const isEmailUpdated = await profileManger.updateEmail(email, user.userId)

        if (!isEmailUpdated) return next(CustomErrorHandler.somethingWentWrong())

        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > Profile > index.js > updateEmail - ${error.message}`)
        next(error)
    }
}

exports.updatePhone = async (req, res, next) => {
    try {
        const user = req.user
        const phone = req.body.phone

        const isPhoneUpdated = await profileManger.updatePhone(phone, user.userId)

        if (!isPhoneUpdated) return next(CustomErrorHandler.somethingWentWrong())

        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > Profile > index.js > updatePhone - ${error.message}`)
        next(error)
    }
}

exports.updateName = async (req, res, next) => {
    try {
        const user = req.user
        const name = req.body.name

        const isNameUpdated = await profileManger.updateName(name, user.userId)

        if (!isNameUpdated) return next(CustomErrorHandler.somethingWentWrong())

        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > Profile > index.js > updateUsername - ${error.message}`)
        next(error)
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const user = req.user
        const currentPassword = req.user.currentPassword
        const password = req.body.password

        if (currentPassword === password) return next(CustomErrorHandler.wrongCredentials("current password and new password are same"))

        // verify the current password
        const isCurrentPasswordValid = await authManger.verifyPassword(currentPassword, user.password)

        if (!isCurrentPasswordValid) return next(CustomErrorHandler.wrongCredentials("Invalid Password"))

        const hashedPassword = await authManger.hashedPassword(password)

        if (!hashedPassword) return next(CustomErrorHandler.somethingWentWrong());

        const isPasswordUpdated = await profileManger.updatePassword(hashedPassword, user.userId)

        if (!isPasswordUpdated) return next(CustomErrorHandler.somethingWentWrong())

        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(`Error: src > controllers > Profile > index.js > updatePassword - ${error.message}`)
        next(error)
    }
}