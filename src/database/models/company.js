'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasOne(models.Address, {
        foreignKey: 'companyId',
        as: 'address'
      })
      Company.hasMany(models.Review, {
        foreignKey: 'companyId',
        as: 'reviews'
      })
      Company.hasMany(models.Job, {
        foreignKey: 'companyId',
        as: 'jobs'
      })
    }
  }
  Company.init({
    nomeDono: DataTypes.STRING,
    razaoSocial: DataTypes.STRING,
    nomeFantasia: DataTypes.STRING,
    segmento: DataTypes.STRING,
    site: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};