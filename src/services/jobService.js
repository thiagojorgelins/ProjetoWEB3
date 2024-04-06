const { Job } = require('../database/models')

class JobService {
    
    async createJob(titulo, descricao, salario, local, companyId){
        const jobData = {
            titulo: titulo,
            descricao: descricao,
            salario: salario,
            local: local,
            companyId: companyId,
        }
        try {
            const job = await Job.create(jobData)
            return job
        } catch(error){
            throw error
        }
    }
}

module.exports = new JobService()