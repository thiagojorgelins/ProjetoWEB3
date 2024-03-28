const UserService = require('../services/userService');

class UserController {

    createUser = async (req, res) => {
        const { nome, email, cpf } = req.body
        if (!nome || !email || !password) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const user = await UserService.createUser(nome, email, cpf)
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
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const user = await this.userService.getUserByEmail(email)
            if (user) {
                const password_ok = await bcrypt.compare(password, user.password)
                if (password_ok) {
                    let token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        nome: user.nome,
                        role: user.role
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
