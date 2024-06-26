const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const addressController = require('../controllers/addressController')
const handlerError = require('../middlewares/handlerError')
const handlerValidate = require('../middlewares/handlerValidator')
const { userAuth } = require('../middlewares/auth')

router.post('/user', handlerError('user'), handlerValidate, userController.createUser)
router.post('/user/login', userController.userLogin)
router.post('/endereco', userAuth, addressController.createAddress)
router.get('/user', userAuth, userController.getAllUser)
router.get('/user/:id', userAuth, userController.getUserById)
router.patch('/user/:id', userAuth, userController.editUser)
router.delete('/user/:id', userAuth, userController.deleteUser)

module.exports = router