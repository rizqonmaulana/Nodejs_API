'use strict';
const {
  Model
} = require('sequelize');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const AES = require('mysql-aes')

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
        as: 'userCompany'
      });
      Event.belongsTo(models.User, {
        foreignKey: 'vendorUserId',
        as: 'userVendor'
      });
    }
  };
  Event.init({
    name: DataTypes.STRING,
    confirmedDateId: DataTypes.INTEGER,
    locationText: DataTypes.STRING,
    locationLat: DataTypes.STRING,
    locationLang:  DataTypes.STRING,
    status: DataTypes.ENUM('Pending', 'Approve', 'Reject'),
    remarks: DataTypes.STRING,
    companyUserId: DataTypes.INTEGER,
    vendorUserId: DataTypes.INTEGER,
    nameEncrypted: DataTypes.STRING,
    locationLatEncrypted: DataTypes.STRING,
    locationLangEncrypted: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Event',
  });

  // Event.beforeCreate(async (event, options) => {
  //   const locationLat = await cryptr.encrypt(event.locationLat);
  //   event.locationLat = locationLat;
  // });

  // untuk decrypt data
  // Event.afterFind((event, options) => {
  //   event.map((item, index) => {
  //     if(item.dataValues.locationLat ){
  //       const decrypt = cryptr.decrypt(item.dataValues.locationLat);
  //       event[index].locationLat = decrypt;
  //     }
  //     if(item.dataValues.locationLang){
  //       const decrypt = cryptr.decrypt(item.dataValues.locationLang);
  //       event[index].locationLang = decrypt;
  //     }
  //   })
  // });
  
  // untuk encrypt ketika get data & update ke DB
  // Event.afterFind((event, options) => {
  //   event.map((item, index) => {
  //     // console.log('ini item : ', item)

  //     if(item.name){
  //       // console.log('ini name : ', item.name)
  //       item.nameEncrypted = AES.encrypt(item.name, process.env.SECRET_KEY);
  //     }

  //     if(item.locationLat){
  //       // console.log('ini locationLat : ', item.locationLat)
  //       item.locationLatEncrypted = AES.encrypt(item.locationLat, process.env.SECRET_KEY);
  //     }

  //     if(item.locationLang){
  //       // console.log('ini locationLang : ', item.locationLang)
  //       item.locationLangEncrypted = AES.encrypt(item.locationLang, process.env.SECRET_KEY);
  //     }
  //     // const encryptLat = cryptr.encrypt(item.dataValues.locationLat);
  //     // const encryptLang = cryptr.encrypt(item.dataValues.locationLang);
      
  //     // item.dataValues.locationLat = encryptLat;
  //     // item.dataValues.locationLang = encryptLang;

  //     // Event.update(
  //     //   { 
  //     //     locationLat: encryptLat,
  //     //     locationLang: encryptLang
  //     //    },
  //     //   { where: { id: item.dataValues.id } }
  //     // )
  //   })
  // });

  return Event;
};