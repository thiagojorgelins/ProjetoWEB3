'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
    }
  }
  Address.init({
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  Address.sync()
  return Address;
};