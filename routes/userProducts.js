const userProductController = require('../controller/productUsers.js')
const orderController = require('../controller/orderController.js')
const { authorizeUser } = require('../auth/authenticate.js');
const {checkToken} = require('../auth/tokenValidation.js')
const router = require('express').Router()
const reviewController = require('../controller/reviewController.js')
router.post('/users/products',userProductController.getAllProductsWithDetails)
router.get('/users/products/category/:categoryName',userProductController.getProductsByCategoryName)
router.get('/users/products/search',userProductController.searchProducts)

//review
router.post('/users/review/:productId',checkToken,reviewController.createReview)
router.get('/users/review/:productId',reviewController.getReviewsByProduct)

//place order
//user
router.post('/users/order/:productId',checkToken,orderController.createOrder)
router.get('/users/order/:id',checkToken,authorizeUser,orderController.getUserOrders)

//business
router.put('/business/orders/:orderId',checkToken,orderController.updateOrderStatus)
router.get('/orders/business/:id',checkToken,authorizeUser,orderController.getBusinessOrders)



module.exports = router
