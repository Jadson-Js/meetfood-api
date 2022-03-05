const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const config = require('@config')

const sendError = require('@helpers/sendErrors')

const loginRoutes = require('@routes/login')
const userRoutes = require('@routes/user')
const roleRoutes = require('@routes/role')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(sessions({
    secret: config.session.secret,
    saveUninitialized:true,
    cookie: { maxAge: 1000*60*60*24 },
    resave: false 
}));
app.use(sendError)

app.use('/', loginRoutes)
app.use('/', userRoutes)
app.use('/', roleRoutes)

module.exports = app