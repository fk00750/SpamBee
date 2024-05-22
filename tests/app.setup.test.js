const errorHandler = require("../src/middlewares/error.handler")

class APP {
    constructor(app) {
        this.app = app
    }

    async ValidationTester(route, validator, message) {
        this.app.post(route, validator, (req, res, next) => {
            try {
                res.status(200).json({ message: message })
            } catch (error) {
                console.log(error.message)
                next(error)
            }
        })

        this.app.use(errorHandler)

        return this.app
    }
}

module.exports = { APP }