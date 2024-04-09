const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')
const { userAuth, companyAuth } = require('../middlewares/auth')

router.get('/job', userAuth, jobController.getAllJob)
router.get('/job/titulo/:titulo', userAuth, jobController.getJobByTitulo)
router.get('/job/:id', companyAuth, jobController.getJobById)
router.post('/job', companyAuth, jobController.createJob)
router.patch('/job/:id', companyAuth, jobController.editJob)
router.delete('/job/:id', companyAuth, jobController.deleteJob)

module.exports = router