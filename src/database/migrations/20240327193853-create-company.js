'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nomeDono: {
        allowNull: false,
        type: Sequelize.STRING
      },
      razaoSocial: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nomeFantasia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      segmento: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.STRING
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};