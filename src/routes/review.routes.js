const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const { userAuth } = require('../middlewares/auth')

router.post('/review', userAuth, reviewController.createReview)
router.get('/review/:companyId', reviewController.getReviewByCompanyId)
router.patch('/review/:id', userAuth, reviewController.editReview)
router.delete('/review/:id', userAuth, reviewController.deleteReview)

module.exports = router