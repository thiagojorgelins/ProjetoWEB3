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

    async getReviewByCompanyId(companyId){
        try {
            const review = await Review.findAll({ where: { companyId: companyId } })
            return review
        } catch(error){
            throw error
        }
    }

    async editReview(id, avaliacao, comentario){
        const reviewData = {
            avaliacao: avaliacao,
            comentario: comentario,
            updatedAt: new Date()
        }
        try {
            const review = await Review.update(reviewData, { where: { id: id } })
            return review
        } catch(error){
            throw error
        }
    }

    async deleteReview(id){
        try {
            const review = await Review.destroy({ where: { id: id } })
            return review
        } catch(error){
            throw error
        }
    }
    
}

module.exports = new ReviewService()