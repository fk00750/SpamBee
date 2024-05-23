const CustomErrorHandler = require("../utils/custom.error.handler");

/**
 * @function validateRequest
 * @description Validate that the request body is not empty.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the request body is empty.
 */
const validateRequest = (req, res, next) => {
    if (!req.body) return next(new CustomErrorHandler(400, "Invalid Request"));

    if (Object.keys(req.body).length === 0) return next(new CustomErrorHandler(400, "Invalid Request"));

    next();
};

/**
 * @function validatePhone
 * @description Validate the phone number in the request body.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the phone number is invalid.
 */
const validatePhone = (req, res, next) => {
    if (!req.body.phone) return next(new CustomErrorHandler(400, "Invalid Phone Number **"));

    const regex = /(0|91)?[6-9][0-9]{9}/;
    const result = regex.test(String(req.body.phone).toLowerCase());

    if (!result) return next(new CustomErrorHandler(400, "Invalid Phone Number"));

    next();
};

/**
 * @function validateName
 * @description Validate the name in the request body.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the name is invalid.
 */
const validateName = (req, res, next) => {
    if (!req.body.name || req.body.name.length < 2) return next(new CustomErrorHandler(400, "Invalid Name **"));

    const regex = /^[a-zA-Z ]+$/;
    const result = regex.test(req.body.name);

    if (!result) return next(new CustomErrorHandler(400, "Invalid Name *"));

    next();
};

/**
 * @function validateEmail
 * @description Validate the email in the request body.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the email is invalid.
 */
const validateEmail = (req, res, next) => {
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"));

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const result = regex.test(String(req.body.email).toLowerCase());

    if (!result) return next(new CustomErrorHandler(400, "Invalid Email"));

    next();
};

/**
 * @function validateTempMail
 * @description Validate the email domain in the request body against a list of allowed providers.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the email domain is invalid.
 */
const validateTempMail = (req, res, next) => {
    if (!req.body.email) return next(new CustomErrorHandler(400, "Invalid Email **"));

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

    if (!domain) return next(new CustomErrorHandler(400, "Invalid Email domain *"));

    if (!providers.includes(domain[0])) return next(new CustomErrorHandler(400, "Invalid Email domain **"));

    next();
};

/**
 * @function validatePassword
 * @description Validate the password in the request body.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the password is invalid.
 */
const validatePassword = (req, res, next) => {
    if (!req.body.password) return next(new CustomErrorHandler(400, "Invalid Password"));

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{;,:'".<>/?]).{8,}$/;
    const result = regex.test(req.body.password);

    if (!result) return next(new CustomErrorHandler(400, "Invalid Password"));

    next();
};

/**
 * @function validateAuthToken
 * @description Validate the authorization token in the request headers.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomErrorHandler} If the authorization token is invalid.
 */
const validateAuthToken = (req, res, next) => {
    if (!req.headers['authorization'] || req.headers['authorization'].split(' ').length <= 1)
        return next(new CustomErrorHandler(400, "Invalid auth token **"));

    const token = req.headers['authorization'].split(' ')[1];
    const { 'refreshes.refreshToken': authenticedToken } = req.user;

    if (authenticedToken !== token) return next(new CustomErrorHandler(400, "Invalid auth token"));

    req.token = token;

    next();
};

module.exports = { validateAuthToken, validateName, validatePhone, validatePassword, validateEmail, validateTempMail, validateRequest };
