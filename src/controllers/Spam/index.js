const CustomErrorHandler = require("../../utils/custom.error.handler");
const { SpamManager } = require("../../utils/spam.manager");

const spamManager = new SpamManager();

/**
 * @async
 * @function SpamNumber
 * @description Mark a phone number as spam for the authenticated user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during the spam number marking process.
 * @returns {Response} Returns a JSON response with the status and message.
 */
exports.SpamNumber = async (req, res, next) => {
    try {
        const user = req.user;
        const phone = req.body.phone;

        // Check if the phone number is already marked as spam by the user.
        const contact = await spamManager.findSpamNumber(phone, user.userId);

        // If the phone number is already marked as spam, respond with an error.
        if (contact) return next(CustomErrorHandler.alreadyExist("already marked spam"));

        // Mark the phone number as spam.
        const isNumberSpammed = await spamManager.markNumberSpam(user.id, user.userId, phone);

        // If marking the phone number as spam fails, respond with an error.
        if (!isNumberSpammed) return next(CustomErrorHandler.somethingWentWrong("unable to mark spam"));

        // Respond with success status and message.
        return res.status(200).json({
            status: 200,
            message: "success"
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`src > controllers > Spam > index.js > SpamNumber : ${error.message}`);
        next(error);
    }
};
