const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const { adminAuth } = require('../middlewares/auth')

router.post('/admin', adminAuth,  adminController.createAdmin)
router.post('/admin/login', adminController.adminLogin)
router.get('/admin/:email', adminController.getAdminByEmail)

module.exports = router