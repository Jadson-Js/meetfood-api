'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        unique: false,
        autoIncrement: false,
        allowNull: false,
        primaryKey: false
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
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};