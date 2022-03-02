const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const config = require('@config')

const sendError = require('@helpers/sendErrors')

const userRoutes = require('@routes/user')
const loginRoutes = require('@routes/login')

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

app.use('/', userRoutes)
app.use('/', loginRoutes)

module.exports = app




