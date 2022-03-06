 'use strict';


 module.exports = {
   up: async (queryInterface, Sequelize) => {
     return queryInterface.createTable('Users',{ 
      id:{
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name:{
        type: Sequelize.STRING(32),
        unique: false,
        allowNull: false,
      },
      email:{
        type: Sequelize.STRING(256),
        unique: true,
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING(256),
        unique: false,
        allowNull: false,
      },
      RoleId:{
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references:{
          model: 'Roles',
          key: 'id'
        }
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
     })
     },
   down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users');
   }
 };