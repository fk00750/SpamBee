const { Op, where } = require("sequelize")
const db = require("../models")

class SearchManager {
    async SearchByQuery(searchQuery, searchQueryType) {
        try {
            let result

            result = await db.User.findAll({
                where: {
                    [searchQueryType]: {
                        [Op.like]: `%${searchQuery}%`,
                    }
                },
                attributes: ['name', 'phone'],
                raw: true
            })

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
                        spamCount
                    }
                }))
            }

            return undefined
        } catch (error) {
            console.log(`utils > search.manager.js > SearchManager > SearchByQuery: ${error.message}`)
            throw error
        }
    }
}

module.exports = { SearchManager }