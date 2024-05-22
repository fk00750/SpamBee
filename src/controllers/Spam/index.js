const CustomErrorHandler = require("../../utils/custom.error.handler")
const { SpamManager } = require("../../utils/spam.manager")

const spamManager = new SpamManager()

exports.SpamNumber = async (req, res, next) => {
    try {
        const user = req.user
        const phone = req.body.phone

        const contact = await spamManager.findSpamNumber(phone, user.userId)

        if (contact) return next(CustomErrorHandler.alreadyExist("already marked spam"))

        const isNumberSpammed = await spamManager.markNumberSpam(user.id, user.userId, phone)

        if (!isNumberSpammed) return next(CustomErrorHandler.somethingWentWrong("unable to mark spam"))

        return res.status(200).json({
            status: 200,
            message: "success"
        })
    } catch (error) {
        console.log(`src > controllers > Spam > index.js > SpamNumber : ${error.message}`)
        next(error)
    }
}