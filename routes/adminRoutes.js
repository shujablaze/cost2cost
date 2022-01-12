const express = require('express')
const productController = require('../controllers/productController')
const pcController = require('../controllers/pcController')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const orderController = require('../controllers/orderController')

const router = express.Router()

router
    .route('/product')
    .get((req,res)=>res.render('productForm'))
    .post(productController.upload.single('img'),productController.createProduct)
    .patch(productController.upload.none(),productController.updateProduct)
    .delete(productController.deleteProduct)

router
    .route('/product/pc')
    .get((req,res)=>res.render('pcForm'))
    .post(productController.upload.single('img'),pcController.createPc)

router
    .route('/users')
    .get(adminController.getUsers)
    .post(adminController.createAdmin)

router
    .route('/orders')
    .get(orderController.getAllOrders)

router
    .route('/orders/order')
    .patch(orderController.markOrderDelivered)
    .delete(orderController.cancelOrder)

module.exports = router