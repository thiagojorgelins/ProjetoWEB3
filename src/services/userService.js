const database = require('../database/models')
const bcrypt = require('bcrypt')
class UserService {

    async createUser(nome, email, cpf){
        const userData = {
            nome: nome,
            email: email,
            senha: await bcrypt.hash(password, 10),
            cpf: cpf,
            tipo: 'User',
        }
        try {
            const user = await database.User.create({userData})
            return user
        } catch (error){
            return error
        }
    }

    async getAllUser() {
        try {
            const users = await database.User.findAll({
                attributes: { exclude: ["senha"] }
            })
            return users
        } catch (error) {
            return error
        }
    }

    async getUserById(id) {
        try {
            return await User.findByPk(id, { attributes: { exclude: ["password"] } })
        } catch (error) {
            return error
        }
    }

    async getUserByEmail(id) {
        try {
            return await User.findOne({ where: { email: email } })
        } catch (error) {
            return error
        }
    }

}

module.exports = new UserService()
