const CustomErrorHandler = require("../../utils/custom.error.handler");
const { SearchManager } = require("../../utils/search.manager");

const searchManager = new SearchManager();

/**
 * @async
 * @function SearchByNameOrPhone
 * @description Search for users by name or phone number based on the query parameters.
 * @param {Request} req - The request object containing query parameters.
 * @param {Response} res - The response object to send back the search results.
 * @param {Function} next - The next middleware function.
 * @throws {Error} In case of any error during the search process.
 * @returns {Response} Returns a JSON response with the search results.
 */
exports.SearchByNameOrPhone = async (req, res, next) => {
    try {
        const { name, phone } = req.query;

        // Determine the search query and its type (name or phone).
        const searchQuery = name ? name : phone;
        const searchQueryType = name ? "name" : "phone";

        // Perform the search using the search manager.
        const users = await searchManager.SearchByQuery(searchQuery, searchQueryType);

        // If no users are found, respond with an error that user not found.
        if (!users) return next(CustomErrorHandler.notFound("user not found"));

        // Respond with the search results.
        return res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        // Log the error and pass it to the error handler middleware.
        console.log(`Error: src > controllers > Search > index.js > SearchByNameOrPhone - ${error.message}`);
        next(error);
    }
};
