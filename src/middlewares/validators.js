const CustomErrorHandler = require("../utils/custom.error.handler")

const validateRequest = (req, res, next) => {
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"))

    if (Object.keys(req.body).length === 0) return next(new CustomErrorHandler(400, "Invalid Request"))

    next()
}

const validatePhone = (req, res, next) => {
    if (!req.body.phone) return next(new CustomErrorHandler(400, "Invalid Phone Number **"))

    const regex = /(0|91)?[6-9][0-9]{9}/
    const result = regex.test(String(req.body.phone).toLowerCase())

    if (!result) return next(new CustomErrorHandler(400, "Invalid Phone Number"))

    next()
}

const validateName = (req, res, next) => {
    if (!req.body.name || !req.body.name.length >= 2) return next(new CustomErrorHandler(400, "Invalid Name **"))

    const regex = /^[a-zA-Z ]+$/
    const result = regex.test(req.body.name)

    if (!result) return next(new CustomErrorHandler(400, "Invalid Name *"))

    next()
}

const validateEmail = (req, res, next) => {
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"))

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const result = regex.test(String(req.body.email).toLowerCase())

    if (!result) return next(new CustomErrorHandler(400, "Invalid Email"))

    next()
}


const validateTempMail = (req, res, next) => {
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"))

    const providers = [
        "@gmail.com",
        "@outlook.com",
        "@yahoo.com",
        "@hotmail.com",
        "@aol.com",
        "@icloud.com",
        "@zoho.com",
        "@byom.de"
    ];

    const regex = /@(\w+)\.(\w+)$/;

    const domain = req.body.email.match(regex);

    if (!domain) return next(new CustomErrorHandler(400, "Invalid Email domain *"))

    if (!providers.includes(domain[0])) return next(new CustomErrorHandler(400, "Invalid Email domain **"))

    next()
}


// validate user password
const validatePassword = (req, res, next) => {
    if (!req.body.password) return next(new CustomErrorHandler(400, "Invalid Password"))

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/;
    const result = regex.test(req.body.password);

    if (!result) return next(new CustomErrorHandler(400, "Invalid Password"))

    next()
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const validateAuthToken = (req, res, next) => {
    if (!req.headers['authorization'] || !req.headers['authorization'].split(' ').length > 0)
        return next(new CustomErrorHandler(400, "invalid auth token **"))

    const token = req.headers['authorization'].split(' ')[1]

    const { 'refreshes.refreshToken': authenticedToken } = req.user;

    if (authenticedToken !== token) return next(new CustomErrorHandler(400, "invalid auth token"))

    req.token = token

    next()
}

module.exports = { validateAuthToken, validateName, validatePhone, validatePassword, validateEmail, validateTempMail, validateRequest }