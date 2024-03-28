const AdminService = require('../services/adminService');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

class AdminControler {
    createAdmin = async (req, res) => {
        const { nome, email } = req.body
        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const admin = await AdminService.createAdmin(nome, email)
            res.status(201).json(admin)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    adminLogin = async (req, res) => {
        const { email, senha } = req.body
        if (!email || !senha) {
            return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const admin = await AdminService.getAdminByEmail(email)
            if (!admin) {
                return res.status(404).json({ msg: 'Admin não encontrado' });
            }
            if (admin) {
                const senha_ok = await bcrypt.compare(senha, admin.senha)
                if (senha_ok) {
                    let token = jwt.sign({
                        id: admin.id,
                        nome: admin.nome,
                        email: admin.email,
                        tipo: admin.tipo
                    }, process.env.JWT_SECRET, { expiresIn: '24h' })
                    res.status(200).json({ msg: 'Admin logado com sucesso!', token: token })
                } else {
                    res.status(400).json({ erro: 'Senha incorreta' })
                }
            } else {
                res.status(404).json({ msg: 'Admin não encontrado' })
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    getAdminByEmail = async (req, res) => {
        const { email } = req.params
        try {
            const admin = await AdminService.getAdminByEmail(email)
            if (admin) {
                res.status(200).json(admin)
            } else {
                res.status(404).json({ msg: 'Admin não encontrado' })
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = new AdminControler()