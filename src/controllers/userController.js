const UserService = require('../services/userService');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler')
class UserController {

    createUser = async (req, res) => {
        const { nome, email, senha, cpf, tipo } = req.body
        try {
            const user = await UserService.createUser(nome, email, senha, cpf, tipo);
            res.status(201).json({ msg: 'Usuário criado com sucesso!', user: user });
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    getAllUser = async (req, res) => {
        try {
            const users = await UserService.getAllUser()
            if (users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ msg: 'Nenhum usuário encontrado' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    userLogin = async (req, res) => {
        const { email, senha } = req.body
        if (!email || !senha) {
            res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        const user = await UserService.getUserByEmail(email)
        try {
            if (user) {
                const senha_ok = await bcrypt.compare(senha, user.senha)
                if (senha_ok) {
                    let token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        nome: user.nome,
                        tipo: user.tipo
                    }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    res.status(200).json({ msg: "Usuário logado com sucesso!", token: token })
                } else {
                    res.status(400).json({ error: "Email ou Senha incorretos!" })
                }
            } else {
                res.status(404).json({ error: "Usuário não encontrado!" })
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params
        try {
            const user = await UserService.getUserById(id)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ msg: 'Usuário não encontrado' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    editUser = async (req, res) => {
        res.send(req.headers)
    }
}

module.exports = new UserController()
