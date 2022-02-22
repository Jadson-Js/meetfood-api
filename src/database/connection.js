const sequelize = require('sequelize')

const connection = new sequelize('meetfood', 'root', 'Powerranger123!', {
    host: 'localhost',
    dialect: 'mysql',
    timezony: '-3:00'
})

module.exports = connection