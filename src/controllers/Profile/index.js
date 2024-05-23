'use strict';

const { AuthManager } = require("../../utils/auth.manager");
const CustomErrorHandler = require("../../utils/custom.error.handler");
const { ProfileManager } = require("../../utils/profile.manager");

const profileManger = new ProfileManager();
const authManger = new AuthManager();

/**
 * @async
 * @function Profile
 * @description Fetch and return the profile information of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during fetching profile information.
 * @returns {Response} Returns a JSON response with user profile information.
 */
exports.Profile = async (req, res, next) => {
    try {
        const user = req.user;

        // Respond with user's profile information: name, phone, and email.
        return res.status(200).json({
            // name: user.name,
            // phone: user.phone,
            // email: user.email,
            user
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Profile > index.js > Profile - ${error.message}`);
        next(error);
    }
};

/**
 * @async
 * @function updateEmail
 * @description Update the email of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during email update process.
 * @returns {Response} Returns a JSON response with the status and message.
 */
exports.updateEmail = async (req, res, next) => {
    try {
        const user = req.user;
        const email = req.body.email;

        // Update the user's email.
        const isEmailUpdated = await profileManger.updateEmail(email, user.userId);

        // If email update fails, respond with an error that something went wrong.
        if (!isEmailUpdated) return next(CustomErrorHandler.somethingWentWrong());

        // Respond with success status and message.
        return res.status(200).json({
            status: 200,
            message: "success",
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Profile > index.js > updateEmail - ${error.message}`);
        next(error);
    }
};

/**
 * @async
 * @function updatePhone
 * @description Update the phone number of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during phone update process.
 * @returns {Response} Returns a JSON response with the status and message.
 */
exports.updatePhone = async (req, res, next) => {
    try {
        const user = req.user;
        const phone = req.body.phone;

        // Update the user's phone number.
        const isPhoneUpdated = await profileManger.updatePhone(phone, user.userId);

        // If phone update fails, respond with an error that something went wrong.
        if (!isPhoneUpdated) return next(CustomErrorHandler.somethingWentWrong());

        // Respond with success status and message.
        return res.status(200).json({
            status: 200,
            message: "success",
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Profile > index.js > updatePhone - ${error.message}`);
        next(error);
    }
};

/**
 * @async
 * @function updateName
 * @description Update the name of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during name update process.
 * @returns {Response} Returns a JSON response with the status and message.
 */
exports.updateName = async (req, res, next) => {
    try {
        const user = req.user;
        const name = req.body.name;

        // Update the user's name.
        const isNameUpdated = await profileManger.updateName(name, user.userId);

        // If name update fails, respond with an error that something went wrong.
        if (!isNameUpdated) return next(CustomErrorHandler.somethingWentWrong());

        // Respond with success status and message.
        return res.status(200).json({
            status: 200,
            message: "success",
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Profile > index.js > updateName - ${error.message}`);
        next(error);
    }
};

/**
 * @async
 * @function updatePassword
 * @description Update the password of the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during password update process.
 * @returns {Response} Returns a JSON response with the status and message.
 */
exports.updatePassword = async (req, res, next) => {
    try {
        const user = req.user;
        const currentPassword = req.body.currentPassword;
        const password = req.body.password;
        
        if (!currentPassword) return next(CustomErrorHandler.wrongCredentials("Provide current password"));

        // Verify the current password.
        const isCurrentPasswordValid = await authManger.verifyPassword(currentPassword, user.password);

        // If current password is invalid, respond with an error.
        if (!isCurrentPasswordValid) return next(CustomErrorHandler.wrongCredentials("Invalid Current Password"));

        // Hash the new password.
        const hashedPassword = await authManger.hashedPassword(password);

        // If password hashing fails, respond with an error.
        if (!hashedPassword) return next(CustomErrorHandler.somethingWentWrong());

        // Update the user's password.
        const isPasswordUpdated = await profileManger.updatePassword(hashedPassword, user.userId);

        // If password update fails, respond with an error that something went wrong.
        if (!isPasswordUpdated) return next(CustomErrorHandler.somethingWentWrong());

        // Respond with success status and message.
        return res.status(200).json({
            status: 200,
            message: "success",
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Profile > index.js > updatePassword - ${error.message}`);
        next(error);
    }
};
