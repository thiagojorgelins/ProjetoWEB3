const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler')
const CompanyService = require('../services/companyService')

class CompanyController {
    createCompany = async (req, res) => {
        const { razaoSocial, nomeFantasia, segmento, site, cnpj, telefone, email } = req.body
        const user = req.user
        try {
            const company = await CompanyService.createCompany(user.nome, razaoSocial, nomeFantasia, segmento, site, cnpj, telefone, email, user.id)
            res.status(201).json({ msg: 'Empresa adicionada com sucesso!', company: company})
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    createEmployee = async(req, res) => {
        try {
            res.status(201).json({ msg: 'Funcionário criado com sucesso!'})
        } catch (error){
            sequelizeErrorHandler(error, req, res);
        }
    }

    userToEmployee = async(req, res) => {
        return 'Criar controller para transformar um usuário normal em funcionário'
    }

    getAllCompany = async(req, res) => {
        try {
            const companies = await CompanyService.getAllCompany()
            res.status(200).json(companies)
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    editCompany = async(req, res) => {
        try {
            res.status(200).json({ msg: 'Empresa atualizada com sucesso!'})
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }

    deleteCompany = async(req, res) => {
        try {
            res.status(200).json({ msg: 'Empresa excluída com sucesso!'})
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }
}

module.exports = new CompanyController()