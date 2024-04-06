const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const addressController = require('../controllers/addressController')
const handlerError = require('../middlewares/handlerError')
const handlerValidate = require('../middlewares/handlerValidator')
const { companyAuth, userAuth } = require('../middlewares/auth')

router.post('/user', handlerError('user'), handlerValidate, userController.createUser)
router.post('/user/login', userController.userLogin)
router.get('/user', userAuth, userController.getAllUser)
router.get('/user/:id', userAuth, userController.getUserById)
router.patch('/user/:id', userAuth, userController.editUser)
router.get('/endereco', userAuth, addressController.createAddress)

module.exports = router