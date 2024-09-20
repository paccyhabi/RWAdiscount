const productController = require('../controller/productsController.js')
const discountController = require('../controller/discountController.js')
const {checkToken} = require('../auth/tokenValidation.js')
const { authorizeUser } = require('../auth/authenticate.js');
const router = require('express').Router()

router.post('/products/add/:id',checkToken,authorizeUser,productController.createProduct)
router.get('/products/all/:id',checkToken,authorizeUser,productController.getAllProducts)
router.get('/products/one/:id',checkToken,productController.getProductById)
router.put('/products/:id',checkToken,productController.updateProduct)
router.delete('/products/:id',checkToken,productController.deleteProduct)

//discounts
router.post('/discounts/add/:id',checkToken,discountController.createDiscount)
router.post('/discounts',checkToken,discountController.getAllDiscounts)
router.post('/discounts/:id',checkToken,discountController.getDiscountById)
router.put('/discounts/:id',checkToken,discountController.updateDiscount)
router.delete('/discounts/:id',checkToken,discountController.deleteDiscount)



module.exports = router
