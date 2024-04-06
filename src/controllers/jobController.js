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
}

module.exports = new JobController()