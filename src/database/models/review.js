'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      })
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Review.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    avaliação: DataTypes.INTEGER,
    comentario: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};