'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event, {
        foreignKey: 'companyUserId'
      });
      User.hasMany(models.Event, {
        foreignKey: 'vendorUserId'
      });
    } 
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    institutionName: DataTypes.STRING,
    role: DataTypes.ENUM('HR', 'vendor')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};