const adminController = require('../controller/adminController.js')
const {checkToken} = require('../auth/tokenValidation.js')
const router = require('express').Router()
const orderController = require('../controller/orderController.js')

router.post('/categories',checkToken,adminController.createCategory)
router.get('/all-categories',checkToken,adminController.getAllCategories)

router.get('/admin/orders',checkToken,orderController.getAllOrders)



module.exports = router
