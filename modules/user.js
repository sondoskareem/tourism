 

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'name Is Required'],
  },
  adminPassword:{
    type: String,
    required: [true, 'admin password is required']
  },

  page_name: {
    type: String,
    required: [true, 'page_name Is Required'],
  },
  discount: {
    type: Number,
    required: [true, 'discount Is Required'],
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'email is required']
  },
  phone:{
    type: String,
    required: [true, ' phone is required']
  },
  type:{
    type: String,
    required: [true, ' type is required']
  },
  logo:{
    type: String,
    required: [true, ' logo is required']
  },
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('User', userSchema);