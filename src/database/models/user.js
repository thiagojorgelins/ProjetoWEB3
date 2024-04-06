'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Address, {
        foreignKey: 'entityId',
        constraints: false,
        as: 'address'
      })
      User.hasMany(models.Review,{
        foreignKey: 'userId',
        as: 'reviews'
      })
      User.hasMany(models.Company, {
        foreignKey: 'userId',
        as: 'ownerCompany'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    curriculo: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};