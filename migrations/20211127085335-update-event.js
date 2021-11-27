'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'confirmedDateId',
     {
        type: Sequelize.INTEGER,
        references: {
          model: "EventDates",
          key: "id",
        },
        onDelete: "CASCADE",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};