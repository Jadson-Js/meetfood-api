'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(32),
        unique: false,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(498),
        unique: false,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};