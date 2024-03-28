const UserService = require('../services/userService');

class UserController {

    createUser = async (req, res) => {
        const { nome, email, senha, cpf } = req.body
        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const user = await UserService.createUser(nome, email, senha, cpf)
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json(error.message)
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
            res.status(500).json(error.message)
        }
    }

    userLogin = async (req, res) => {
        const { email, senha } = req.body
        if (!email || !senha) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const user = await this.userService.getUserByEmail(email)
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
            return res.status(500).json(error.message)
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
            res.status(500).json(error.message)
        }
    }

    getUserByEmail = async (req, res) => {
        const { email } = req.params
        try {
            const user = await UserService.getUserByEmail(email)
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ msg: 'Usuário não encontrado' })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = new UserController()
