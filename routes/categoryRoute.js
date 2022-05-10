const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const productRoute = require('./productRoute');
//category/3132412/product/

router.use('/:categoryID/product', productRoute);   

router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.creatNewCategory);
router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory);

module.exports = router;