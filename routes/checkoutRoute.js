const express = require('express');
const route = express.Router();
const checkoutController = require('../controllers/checkoutController')
const authController = require('../controllers/authController');

//route.use(authController.protect);
route.get('/checkout-session',authController.isLogin,checkoutController.getCheckoutSession)
route.post('/createCheckout',checkoutController.createCheckout)
module.exports = route;