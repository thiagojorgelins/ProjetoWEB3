const JobService = require('../services/jobService')
const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler')

class JobController {

    async createJob(req, res) {
        const { titulo, descricao, salario, local, companyId } = req.body
        try {
            const job = await JobService.createJob(titulo, descricao, salario, local, companyId)
            return res.status(201).json(job)
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async getAllJob(req, res) {
        try {
            const jobs = await JobService.getAllJob()
            return res.status(200).json(jobs)
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async getJobByTitulo(req, res) {
        const { titulo } = req.params
        try {
            const job = await JobService.getJobByTitulo(titulo)
            if (job) {
                return res.status(200).json(job)
            } else {
                return res.status(404).json({ msg: 'Vaga não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async getJobById(req, res) {
        const { id } = req.params
        try {
            const job = await JobService.getJobById(id)
            if (job) {
                return res.status(200).json(job)
            } else {
                return res.status(404).json({ msg: 'Vaga não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }   

    async editJob(req, res) {
        const { id } = req.params
        const { titulo, descricao, salario, local } = req.body
        try {
            const job = await JobService.editJob(id, titulo, descricao, salario, local)
            if (job) {
                return res.status(200).json({ msg: 'Vaga atualizada com sucesso!' })
            } else {
                return res.status(404).json({ msg: 'Vaga não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async deleteJob(req, res) {
        const { id } = req.params
        try {
            const job = await JobService.deleteJob(id)
            if (job) {
                return res.status(200).json({ msg: 'Vaga excluída com sucesso!' })
            } else {
                return res.status(404).json({ msg: 'Vaga não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }
}

module.exports = new JobController()