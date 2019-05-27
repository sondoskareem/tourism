 

const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    unique: false,
    type: String,
    required: [true, 'name Is Required'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  red: {
    type: Boolean,       ///////////
    required: [true, 'status Is Required'],
  },
  last_rating: {
    type: Number,
    required: [true, 'last_rating Is Required'],
  },
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

module.exports = mongoose.model('Table', tableSchema);