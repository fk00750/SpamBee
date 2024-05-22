const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const errorHandler = require("./middlewares/error.handler");
const AuthRouter = require('./routes/Auth/index')
const ProfileRouter = require('./routes/Profile/index')
const ContactRouter = require('./routes/Contact/index')
const SpamRouter = require('./routes/Spam/index')
const SearchRouter = require('./routes/Search/index')
const TokenRouter = require('./routes/Token/index')
const passport = require('passport');
const helmet = require('helmet')
const { passportConfig } = require("./config/passport.config");
const session = require('express-session')

const app = express()

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
        },
    },
    referrerPolicy: {
        policy: "no-referrer"
    },
    hsts: {
        maxAge: 21945600, // 254 days
        includeSubDomains: false
    },
    frameguard: {
        action: "deny",
    },
    noSniff: true,
}))

// const allowedOrigins = ["https://dtbx.exchange"]
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error('Not allowed by CORS'));
//             }
//         },
//     })
// );

// app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

passportConfig(passport)

app.use(
    session({
        secret: "yoursecretkey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }, // for demo purpose only, set to true in a production environment
    })
);


app.get("/", (req, res) => {
    res.status(200).send("Welcome !!!")
})

app.use('/api/auth', AuthRouter)
app.use('/api/profile', ProfileRouter)
app.use('/api/contact', ContactRouter)
app.use('/api/spam', SpamRouter)
app.use('/api/search', SearchRouter)
app.use('/api/token', TokenRouter)

app.use(errorHandler)

module.exports = app