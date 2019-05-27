 

const mongoose = require('mongoose');

const tourismSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  email: {
    unique: true,
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'name Is Required'],
  },
  phone:{
    type: String,
    required: [true, ' phone is required']
  },
  type:{
    type: String,
    required: [true, ' type is required']
  },
  licenseDate:{
    type: String,
    required: [true, ' licenseDate is required']
  },
  logo:{
    type: String,
    required: [true, ' logo is required']
  },
  // red: {
  //   type: Boolean,       ///////////
  //   required: [true, 'status Is Required'],
  // },
  // last_rating: {
  //   type: Number,
  //   required: [true, 'last_rating Is Required'],
  // },
  pplCount: {
    type: Number,
    required: [true, 'pplCount Is Required'],
  },
  sum: {
    type: Number,
    required: [true, 'sum Is Required'],
  },
  rating: {
    type: Number,
    required: [true, 'rating Is Required'],
  },
  lastSurvey: {
    type: String,
    required: [true, 'lastSurvey Is Required'],
  },
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('Tourism', tourismSchema);