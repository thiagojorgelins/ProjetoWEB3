'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      })
    }
  }
  Job.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    salario: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};