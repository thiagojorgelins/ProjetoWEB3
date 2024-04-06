const { Review } = require('../database/models')

class ReviewService{
    
    async createReview(userId, companyId, avaliacao, comentario){
        const reviewData = {
            userId: userId,
            companyId: companyId,
            avaliacao: avaliacao,
            comentario: comentario,
        }
        try {
            const review = await Review.create(reviewData)
            return review
        } catch(error){
            throw error
        }
    }
}

module.exports = new ReviewService()