const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')
const { companyAuth } = require('../middlewares/auth')

router.post('/job', companyAuth, jobController.createJob)

module.exports = router