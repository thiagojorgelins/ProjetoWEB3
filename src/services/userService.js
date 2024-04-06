const { User } = require('../database/models')
const bcrypt = require('bcrypt')
class UserService {

    async createUser(nome, email, senha, telefone, curriculo, cpf, tipo) {
        const userData = {
            nome: nome,
            email: email,
            senha: await bcrypt.hash(senha, 10),
            telefone: telefone,
            curriculo: curriculo,
            cpf: cpf,
            tipo: tipo,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw error
        }
    }

    async getAllUser() {
        try {
            const users = await User.findAll({
                attributes: { exclude: ["senha"] }
            })
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserById(id) {
        try {
            return await User.findByPk(id, { attributes: { exclude: ["senha"] } })
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ where: { email: email } })
        } catch (error) {
            throw error
        }
    }

    async editUser(id, nome, email, telefone, curriculo, cpf, tipo) {
        try {
            const userData = {
                nome: nome,
                email: email,
                telefone: telefone,
                curriculo: curriculo,
                cpf: cpf,
                tipo: tipo,
                updatedAt: new Date()
            }
            const user = await User.update(userData, { where: { id: id } })
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = new UserService()
