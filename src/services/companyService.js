const { Company } = require('../database/models')
const { User } = require('../database/models')
class CompanyService {

    async createCompany(nomeDono, razaoSocial, nomeFantasia, segmento, site, cnpj, telefone, email, userId) {
        const companyData = {
            nomeDono: nomeDono,
            razaoSocial: razaoSocial,
            nomeFantasia: nomeFantasia,
            segmento: segmento,
            site: site,
            cnpj: cnpj,
            telefone: telefone,
            email: email,
            userId: userId
        }
        try {
            const company = await Company.create(companyData)
            return company
        } catch (error) {
            throw error
        }
    }

    async createEmployee(nome, email, senha, cpf) {
        const userData = {
            nome: nome,
            email: email,
            senha: await bcrypt.hash(senha, 10),
            cpf: cpf,
            tipo: 'Employee'
        }
        try {
            const user = await User.create(userData)
            return user
        } catch (error) {
            throw error
        }
    }

    async getAllCompany() {
        try {
            const companies = await Company.findAll()
            return companies
        } catch (error) {
            throw error
        }
    }

    async editCompany(id, razaoSocial, nomeFantasia, segmento, site, cnpj, telefone, email) {
        try {
            const companyData = {
                razaoSocial: razaoSocial,
                nomeFantasia: nomeFantasia,
                segmento: segmento,
                site: site,
                cnpj: cnpj,
                telefone: telefone,
                email: email,
                updatedAt: new Date()
            }
            return await Company.update(companyData, { where: { id: id } })
        } catch (error) {
            throw error
        }
    }

    async deleteCompany(id) {
        try {
            return await Company.destroy({ where: { id: id } })
        } catch (error) {
            throw error
        }
    }

}

module.exports = new CompanyService()