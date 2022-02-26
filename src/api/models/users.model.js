const Sequelize = require('sequelize')
const connection = require('@database/connection')

const Users = connection.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    },
    password: {
        type: Sequelize.STRING,
        unique: false,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
    }
})

Users.sync()

module.exports = Users