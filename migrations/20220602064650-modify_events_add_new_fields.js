'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Events', 'nameEncrypted', {
        type: Sequelize.BLOB,
        allowNull: true,
      }),
      queryInterface.addColumn('Events', 'locationLatEncrypted', {
        type: Sequelize.BLOB,
        allowNull: true,
      }),
      queryInterface.addColumn('Events', 'locationLangEncrypted', {
        type: Sequelize.BLOB,
        allowNull: true,
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Events', 'nameEncrypted'),
      queryInterface.removeColumn('Events', 'locationLatEncrypted'),
      queryInterface.removeColumn('Events', 'locationLangEncrypted'),
    ]);
  }
};
