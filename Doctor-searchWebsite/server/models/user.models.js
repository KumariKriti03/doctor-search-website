const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,

  },
  phone: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 13,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
