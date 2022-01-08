const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router
    .route('/profile')
    .get(authController.protectedRoute,(req,res) => res.render('profile'))

router    
    .route('/profile/info')
    .get(authController.protectedRoute,userController.getPersonalInfo)
    .patch(authController.protectedRoute,userController.updateProfile)

router
    .route('/profile/policy')
    .get((req,res,next)=>res.render('privacy_policy'))

router
    .route('/profile/password')
    .get((req,res,next)=>res.render('password'))
    .patch(authController.changePassword)

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