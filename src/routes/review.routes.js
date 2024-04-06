const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const { userAuth } = require('../middlewares/auth')

router.post('/review', userAuth, reviewController.createReview)

module.exports = router