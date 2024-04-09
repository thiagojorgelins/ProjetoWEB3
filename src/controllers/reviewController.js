const ReviewService = require('../services/reviewService')
const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler')

class ReviewController {

    async createReview(req, res) {
        const { userId, companyId, avaliacao, comentario } = req.body
        try {
            const review = await ReviewService.createReview(userId, companyId, avaliacao, comentario)
            return res.status(201).json(review)
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async getReviewByCompanyId(req, res) {
        const { companyId } = req.params
        try {
            const review = await ReviewService.getReviewByCompanyId(companyId)
            if (review) {
                return res.status(200).json(review)
            } else {
                return res.status(404).json({ msg: 'Avaliação não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async editReview(req, res) {
        const { id } = req.params
        const { avaliacao, comentario } = req.body
        try {
            const review = await ReviewService.editReview(id, avaliacao, comentario)
            if (review) {
                return res.status(200).json({ msg: 'Avaliação atualizada com sucesso!' })
            } else {
                return res.status(404).json({ msg: 'Avaliação não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }

    async deleteReview(req, res) {
        const { id } = req.params
        try {
            const review = await ReviewService.deleteReview(id)
            if (review) {
                return res.status(200).json({ msg: 'Avaliação excluída com sucesso!' })
            } else {
                return res.status(404).json({ msg: 'Avaliação não encontrada' })
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }
}

module.exports = new ReviewController()