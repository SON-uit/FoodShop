const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController')
const authController = require('../controllers/authController');

const checkoutMomo = require('../controllers/checkoutMomo');




//route.use(authController.protect);
router.get('/checkout-session',authController.isLogin,checkoutController.getCheckoutSession)
router.post('/createCheckout',checkoutController.createCheckout)

router.get('/checkout-momo',checkoutMomo.getCheckoutMomo)
module.exports = router;