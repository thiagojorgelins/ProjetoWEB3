const { Admin } = require('../database/models')
const bcrypt = require('bcrypt')

class AdminService {
    async createAdmin(nome, email, senha) {
        const adminData = {
            nome: nome,
            email: email,
            senha: await bcrypt.hash(senha, 10),
            tipo: 'Admin'
        }
        try {
            const admin = await Admin.create(adminData)
            return admin
        } catch (error) {
            throw error
        }
    }

    async getAdminByEmail(email) {
        try {
            const admin = await Admin.findOne({ where: { email: email } })
            return admin
        } catch (error) {
            throw error
        }
    }
}

module.exports = new AdminService()