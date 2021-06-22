const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router();

router
    .route('/login')
    .get((req,res)=>res.render('login'))
    .post(authController.loginUser)

router
    .route('/signup')
    .get((req,res)=>res.render('signup'))
    .post(authController.signupUser)
router
    .route('/logout')
    .get(authController.logoutUser)

module.exports = router;