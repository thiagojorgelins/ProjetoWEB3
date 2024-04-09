const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')
const { companyAuth } = require('../middlewares/auth')

router.get('/company', companyAuth, companyController.getAllCompany)
router.post('/company', companyAuth, companyController.createCompany)
router.post('/company/employee', companyAuth, companyController.createEmployee)
router.post('/company/userToEmployee', companyAuth, companyController.userToEmployee)
router.patch('/company/:id', companyAuth, companyController.editCompany)
router.delete('/company/:id', companyAuth, companyController.deleteCompany)

module.exports = router