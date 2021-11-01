const express = require('express');
const multer =  require('multer');
const route = express.Router({ mergeParams:true });
const productController = require('../controllers/productController');
const { storage } = require('../cloudinary/index');
const { cloudinary } = require('../cloudinary')
const upload = multer({ storage });

// /product/
route
  .route('/')
  .get(productController.getAllProduct)
  .post(upload.array('images'), productController.createNewProduct);
  //cai dat multer thi moi co req.files
route
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);
route.get('/addCart/:id', productController.addCart);
route.get('/deleteItem/:id', productController.deleteItem);
route.get('/editQtyItem/:id/qty/:qty', productController.editQtyItem);
module.exports = route;