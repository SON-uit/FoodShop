const stripe = require("stripe")(process.env.STRIPE_SECRECTKEY);

const Order = require("../models/orderModel");
const OrderProduct = require('../models/orderProductModel');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require('../utils/sendEmail');
const User = require('../models/userModel');
module.exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //get orderID
  //const order = await OrderProduct.find({order:req.params.orderID});
  const cart =  req.session.cart.listProduct;
  const line_items = cart.map(el => {
    return {
       name: el.name,
       description: el.info.description,
       images:el.info.images.map((img) => img.url),
       amount: el.price,
       currency:'vnd',
       quantity:el.qty
    }
  })
  //create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get('host')}/checkout/?paymentStatus=success`,
    cancel_url: `${req.protocol}://${req.get('host')}/checkout/?paymentStatus=failed`,
    customer_email:req.user.email,
    mode: 'payment',
    line_items,
  })
  //Creat session response
  return res.status(200).json({
    status: 'success',
    session,
  })
});
module.exports.createCheckout = catchAsync(async (req, res, next) => {
  const { username, email, phone, address, message, date,payment } = req.body;
  const user = await User.findOne({ email: email });
  const order = new Order({
    user: user.id,
    message,
    phone,
    address,
    date,
    payment,
    totalPrice: req.session.cart.totalPrice,
    totalQty: req.session.cart.totalQuantity
  })
  await order.save()
  req.session.cart.listProduct.forEach(async (product) =>  {
    const orderProduct = new OrderProduct({
      order: order.id,
      product: product.id, 
      qty: product.qty,
      price: product.price,
    })
  await orderProduct.save();
  })
  try {
    const url = "http://localhost:3000/home";
    const data = req.session.cart;
    const sendEmail = new Email(user,url,data);
    await sendEmail.sendMail();
  } catch (err) {
    console.log(err);
  }
  res.clearCookie('session');
  res.status(200).json({
    status: 'success',
    message: 'Order successfuly'
  });
})
