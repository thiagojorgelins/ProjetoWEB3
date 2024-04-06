const { User } = require('../database/models')
const bcrypt = require('bcrypt')
class UserService {

    async createUser(nome, email,senha, cpf, tipo){
        const userData = {
            nome: nome,
            email: email,
            senha: await bcrypt.hash(senha, 10),
            cpf: cpf,
            tipo: tipo ? 'User' : 'Company',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try {
            const user = await User.create(userData)
            return user
        } catch (error){
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

}

module.exports = new UserService()
