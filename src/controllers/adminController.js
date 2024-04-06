const AdminService = require('../services/adminService');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler');

class AdminControler {
    createAdmin = async (req, res) => {
        const { nome, email, senha } = req.body
        if (!nome || !email || !senha) {
            res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const admin = await AdminService.createAdmin(nome, email, senha)
            if (admin.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ error: admin.errors[0].message })
            } else {
                res.status(201).json({ msg: 'Admin criado com sucesso', admin: admin })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    adminLogin = async (req, res) => {
        const { email, senha } = req.body
        if (!email || !senha) {
            res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' })
        }
        try {
            const admin = await AdminService.getAdminByEmail(email)
            if (!admin) {
                res.status(404).json({ error: 'Admin não encontrado' });
            }
            else {
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
                    res.status(400).json({ error: 'Senha incorreta' })
                }
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
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
            sequelizeErrorHandler(error, req, res);
        }
    }
}

module.exports = new AdminControler()