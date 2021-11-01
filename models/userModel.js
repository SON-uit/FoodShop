const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    maxlength: 16,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please provide your password comfirm'],
    minlength: 8,
    maxlength: 16,
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'Incorrect password comfirm.Please try again',
    },
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  address: {
    type: String,
    require: [true, 'Please provide your address'],
  }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
})
userSchema.methods.comparePassword = async function(enterPassword, userPassword) {
  return bcrypt.compare(enterPassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;