const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const pathToAccessTokenPublicKey = path.join(
    __dirname,
    "../../..",
    "AccessTokenPublicKey.pem"
);

const ACCESS_PUBLIC_KEY = fs.readFileSync(pathToAccessTokenPublicKey, "utf-8");


const pathToRefreshTokenPublicKey = path.join(
    __dirname,
    "../../..",
    "RefreshTokenPublicKey.pem"
);

const REFRESH_PUBLIC_KEY = fs.readFileSync(pathToRefreshTokenPublicKey, "utf-8");

class verifyJWT {
    static ACCESS_TOKEN_PUBLIC_KEY = ACCESS_PUBLIC_KEY;
    static REFRESH_TOKEN_PUBLIC_KEY = REFRESH_PUBLIC_KEY;

    static async authenticateJWT(token) {
        try {
            const decodedToken = jwt.verify(token, this.ACCESS_TOKEN_PUBLIC_KEY, {
                algorithms: ["RS256"],
            });

            return decodedToken
        } catch (error) {
            console.log(`Error: utils > jwt > verify.jwt.token.js: ${error.message}`)
        }
    }
}

module.exports = verifyJWT