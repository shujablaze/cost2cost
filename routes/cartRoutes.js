const express = require('express')
const cartController = require('../controllers/cartController')

const router = express.Router()

router
    .route('/')
    .get(cartController.displayCart)
    .post(cartController.updateCart)
    .patch(cartController.updateQuantity)
    .delete(cartController.deleteCartItem)

module.exports = router