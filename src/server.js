const app = require("./app");
const env = require("dotenv");
const db = require('./models/index')

env.config()

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`)
    db.sequelize.sync({ force: false }).then(() => {
        console.log("Synced DB")
    }).catch((err) => {
        console.log("Failed to connect", err.message)
    })
})