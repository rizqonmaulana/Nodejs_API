'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      locationText: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      locationLat: {
        type: Sequelize.STRING
      },
      locationLang: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approve', 'Reject'), 
        allowNull: false
      },
      remarks: {
        type: Sequelize.STRING
      },
      companyUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      vendorUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};