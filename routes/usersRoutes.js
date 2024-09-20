const userController = require('../controller/userController.js')
const {checkToken} = require('../auth/tokenValidation.js')
const { authorizeUser } = require('../auth/authenticate.js');
const router = require('express').Router()

//business
router.post('/business/signup', userController.addUser)
router.post('/business/login', userController.loginBusiness)

//admin
router.post('/admin/signup',userController.addAdmin)
router.post('/admin/login',userController.loginAdmin)

//users
router.post('/user/signup', userController.addUser)
router.post('/user/login', userController.loginUser)

//general
router.post('/forgot-password',userController.forgotPassword)
router.get('/verify-email',userController.verifyEmail)
router.get('/:id',checkToken,authorizeUser, userController.getOneUser)
router.put('/:id',checkToken,authorizeUser, userController.updateUser)
router.put('/password/:id',checkToken,authorizeUser, userController.updatePassword)
router.delete('/:id',checkToken,authorizeUser, userController.deleteUser)



module.exports = router
