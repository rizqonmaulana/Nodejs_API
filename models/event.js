'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventDate, {
        foreignKey: 'eventId',
        as: 'eventDates'
      });
      Event.belongsTo(models.User, {
        foreignKey: 'companyUserId',
      });
      Event.belongsTo(models.User, {
        foreignKey: 'vendorUserId',
      });
    }
  };
  Event.init({
    name: DataTypes.STRING,
    confirmedDateId: DataTypes.INTEGER,
    locationText: DataTypes.STRING,
    locationLat: DataTypes.STRING,
    locationLang: DataTypes.STRING,
    status: DataTypes.ENUM('Pending', 'Approve', 'Reject'),
    remarks: DataTypes.STRING,
    companyUserId: DataTypes.INTEGER,
    vendorUserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};