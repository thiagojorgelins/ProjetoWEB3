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
}

module.exports = new ReviewController()