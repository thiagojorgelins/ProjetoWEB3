const { Job } = require('../database/models')
const { Op } = require('sequelize')

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

    async getAllJob(){
        try {
            const jobs = await Job.findAll()
            return jobs
        } catch(error){
            throw error
        }
    }

    async getJobByTitulo(titulo){
        try {
            const job = await Job.findAll({ where: 
                { 
                    titulo: {
                        [Op.substring]: titulo
                    }
                } })
            return job
        }
        catch(error){
            throw error
        }
    }

    async getJobById(id){
        try {
            const job = await Job.findOne({ where: { id: id } })
            return job
        } catch(error){
            throw error
        }
    }

    async editJob(id, titulo, descricao, salario, local){
        const jobData = {
            titulo: titulo,
            descricao: descricao,
            salario: salario,
            local: local,
        }
        try {
            const job = await Job.update(jobData, { where: { id: id } })
            return job
        } catch(error){
            throw error
        }
    }

    async deleteJob(id){
        try {
            const job = await Job.destroy({ where: { id: id } })
            return job
        } catch(error){
            throw error
        }
    }
}

module.exports = new JobService()