'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'owner'
      })
      Company.hasOne(models.Address, {
        foreignKey: 'entityId',
        constraints: false,
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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nomeDono: DataTypes.STRING,
    razaoSocial: DataTypes.STRING,
    nomeFantasia: DataTypes.STRING,
    segmento: DataTypes.STRING,
    site: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};