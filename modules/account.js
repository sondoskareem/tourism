 

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'name Is Required'],
  },
  comp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'email is required']
  },
  adminPassword:{
    type: String,
    required: [true, 'admin password is required']
  },
  // adminEmail:{
  //   type: String,
  //   required: [true, 'admin email is required']
  // },

  lastLogin:{
    type: String,
    required: [true, 'lastLogin is required']
  },
  phone:{
    type: String,
    required: [true, 'phone is required']
  },
  password:{
    type: String,
    required: [true, 'password is required']
  },
  type:{
    type: String,
    required: [true, ' type is required']
  },
  licenseDate:{
    type: String,
    required: [true, ' licenseDate is required']
  },
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('Account', userSchema);