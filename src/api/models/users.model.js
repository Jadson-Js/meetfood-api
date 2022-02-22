const sequelize = require('sequelize')
const connection = require('@database/connection')

const Users = connection.define('users', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: { 
        type: sequelize.STRING,
        allowNull: false
    },
})

module.exports = Users