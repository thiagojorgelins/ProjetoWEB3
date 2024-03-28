const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const { adminAuth } = require('../middlewares/auth')

router.post('/admin', adminAuth,  adminController.createAdmin)
router.post('/admin/login', adminController.adminLogin)
router.get('/user', adminAuth, userController.getAllUser)
router.get('/admin/:email', adminController.getAdminByEmail)

module.exports = router