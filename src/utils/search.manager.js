const { Op } = require("sequelize")
const db = require("../models")

/**
 * @class SearchManager
 * @description Class responsible for managing search operations for users and contacts.
 */
class SearchManager {
    /**
     * @async
     * @method SearchByQuery
     * @description Search for users or contacts based on a query and query type. If no results are found in users, it searches in contacts. Additionally, it fetches the spam count for each found item.
     * @param {string} searchQuery - The search query to look for in the database.
     * @param {string} searchQueryType - The type of query (e.g., 'name' or 'phone').
     * @throws {Error} In case of any error during the search process.
     * @returns {Promise<Array|undefined>} Returns an array of search results with spam count or undefined if no results found.
     */
    async SearchByQuery(searchQuery, searchQueryType) {
        try {
            let result

            // Search in the User table based on the searchQuery and searchQueryType.
            result = await db.User.findAll({
                where: {
                    [searchQueryType]: {
                        [Op.like]: `%${searchQuery}%`,
                    }
                },
                attributes: ['name', 'phone', 'email'],
                raw: true
            })

            // If no results found in User table, search in the Contact table.
            if (!result || result.length === 0) {
                result = await db.Contact.findAll({
                    where: {
                        [searchQueryType]: {
                            [Op.like]: `%${searchQuery}%`,
                        }
                    },
                    attributes: ['name', 'phone'],
                    raw: true
                })
            }

            // If results are found, map each result to include spam count.
            if (result && result.length > 0) {
                return await Promise.all(result.map(async (item) => {
                    const spamCount = await db.Spam.count({
                        where: {
                            phone: {
                                [Op.like]: `%${item.phone}%`,
                            }
                        },
                        raw: true
                    })

                    return {
                        name: item.name,
                        phone: item.phone,
                        email: item.email,
                        spamCount
                    }
                }))
            }

            // Return undefined if no results found in both User and Contact tables.
            return undefined
        } catch (error) {
            // Log the error and throw it for the calling function to handle.
            console.log(`utils > search.manager.js > SearchManager > SearchByQuery: ${error.message}`)
            throw error
        }
    }
}

module.exports = { SearchManager }
