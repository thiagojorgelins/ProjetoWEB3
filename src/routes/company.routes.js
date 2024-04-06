const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')
const { companyAuth } = require('../middlewares/auth')

router.post('/company', companyAuth, companyController.createCompany)
router.post('/company/employee', companyAuth, companyController.createEmployee)

module.exports = router