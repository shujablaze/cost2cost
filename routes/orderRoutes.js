const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router
    .route('/checkout')
    .post(orderController.checkout)
router
    .route('/admin')
    .get(orderController.getAllOrders)

router
    .route('/')
    .get(orderController.getBuyersOrder)

router
    .route('/order/:orderId')
    .get(orderController.getOrder)
    .delete(orderController.cancelOrder)
    
module.exports = router