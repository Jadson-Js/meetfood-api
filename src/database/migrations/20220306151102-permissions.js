// 'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permissions',{ 
     id: {
       type: Sequelize.INTEGER,
       unique: true,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true
     },
     name: {
       type: Sequelize.STRING,
       unique: true,
       allowNull: false,
     },
     description: {
       type: Sequelize.STRING,
       unique: true,
       allowNull: false,
     },
     updatedAt: Sequelize.DATE,
     createdAt: Sequelize.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Permissions');
  }
};