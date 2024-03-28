'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin', 10)
    await queryInterface.bulkInsert('Admins', [{
      id: 1,
      nome: 'Admin',
      email: 'admin@email.com',
      senha: hashedPassword,
      tipo: 'Admin',
      createdAt: new Date(),
      updatedAT: new Date()
    }], {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', { email: 'admin@example.com' }, {});
  }
};
