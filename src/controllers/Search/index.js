const CustomErrorHandler = require("../../utils/custom.error.handler")
const { SearchManager } = require("../../utils/search.manager")

const searchManager = new SearchManager()

exports.SearchByNameOrPhone = async (req, res, next) => {
    try {
        const { name, phone } = req.query

        const searchQuery = name ? name : phone
        const searchQueryType = name ? "name" : "phone"

        const users = await searchManager.SearchByQuery(searchQuery, searchQueryType)

        if (!users) return next(CustomErrorHandler.notFound("user not found"))

        return res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        console.log(`Error: src > controllers > Search > index.js > SearchByName - ${error.message}`)
        next(error)
    }
}