const config = require('config')
const sequelize = require('sequelize')

const connection = new sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    timezony: '-3:00'
})

module.exports = connection