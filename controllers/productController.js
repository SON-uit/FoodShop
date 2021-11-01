const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const Cart = require('../cart');
const AppError = require('../utils/appError');

module.exports.createNewProduct = catchAsync(async (req, res, next) => {
  let idCategory;
  if (req.params.categoryID) idCategory = req.params.categoryID;
  if (req.body.category) idCategory = req.body.category;
  const categoryProduct = await Category.findById(idCategory);
  const product =  new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })
  // req.files phai cai dat multer ben route
  if( req.files){
    product.images = req.files.map((f) => ({ url: f.path , fileName: f.filename }));
  }
  categoryProduct.products.push(product);
  await product.save();
  await categoryProduct.save(),
  res.status(200).json({
    status: 'success',
    data: product,
  })
});
module.exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: products,
  })
})
module.exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
})
module.exports.updateProduct = catchAsync( async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body ,{new: true});
  if (!product) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
})
module.exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if(!product) {
    return next(new AppError ('Can\'t not found this product with this ID'), 400);
  }
  res.status(200).json({
    status: 'success',
    message: 'Delete success',
  })
})
module.exports.addCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const cart = new Cart(req.session.cart ? req.session.cart : {})
  cart.addtoCart(product, id);
  req.session.cart = cart;
  res.locals.cart = cart;
  res.render('cart/index')
})
module.exports.deleteItem =  (req, res, next) => {
  const { id } = req.params;
  const cart = new Cart (req.session.cart ? req.session.cart : {});
  cart.deleteFromCart(id);
  req.session.cart = cart ;
  res.locals.cart = cart;
  if (cart.listProduct.length <= 0) {
    req.session.destroy();
    res.clearCookie('session');
    res.locals.cart = undefined;
  } 
  res.render('cart/index')
};
module.exports.editQtyItem = (req, res, next) => {
  const { id } = req.params;
  const qty = req.params.qty *1;
  const cart = new Cart( req.session.cart ? req.session.cart : {});
  cart.editQtyItem(id, qty);
  req.session.cart = cart;
  res.locals.cart = cart;
  res.render('cart/index')
};