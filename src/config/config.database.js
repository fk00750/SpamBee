const env = require("dotenv");
env.config();

const STAGE = process.env.STAGE;
const PROD_HOST = process.env.PROD_HOST;
const DEV_HOST = "localhost";

module.exports = {
    HOST: STAGE === "PROD" ? PROD_HOST : DEV_HOST,
    USER: 'me',
    PASSWORD: STAGE === "PROD" ? process.env.PROD_PASSWORD : process.env.DEV_PASSWORD,
    DB: STAGE === "PROD" ? process.env.PROD_DB : process.env.DEV_DB,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};