const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
module.exports.home = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.render('layout/home', { products });
});
module.exports.signupForm = (req, res) => {
  res.render('users/registerForm');
}
module.exports.loginForm = (req, res) => {
  res.render('users/loginForm');
}
module.exports.createProductForm = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.render('products/productForm', { categories });
});
module.exports.details = catchAsync(async(req, res) => {
  const product = await Product.findOne({ slug: req.params.slug});
  res.render('layout/productDetails', {product});
})
module.exports.checkout = (req , res) => {
  res.render('layout/checkout');
} 
module.exports.category = (req,res) => {
  res.render('layout/category')
}