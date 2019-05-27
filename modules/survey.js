 

const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    unique: false,
    type: String,
    required: [true, 'name Is Required'],
  },
  table_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',     ///////////
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',    ////////////
    required: true
  },
  age: {
    unique: false,
    type: String,       ///////////
    required: [true, 'age Is Required'],
  },
  email: {
    type: String,
    required: [true, 'email Is Required'],
  },
  phone: {
    type: String,
    required: [true, 'phone Is Required'],
  },
  people_number: {
    type: Number ,         ////////
    required: [true, 'people_number Is Required'],
  },
  service: {
    type: Number ,         ////////
    required: [true, 'service Is Required'],
  },
  cleanliness: {
    type: Number,
    required: [true, 'name Is Required'],
  },
  food_assessment: {
    type: Number,
    required: [true, 'cleanliness Is Required'],
  },
  wc: {
    type: Number,
    required: [true, 'wc Is Required'],
  },
  atmosphere: {
    type: Number,
    required: [true, 'atmosphere Is Required'],
  },
  recommended: {
    type: Boolean,
    required: [true, 'recommended Is Required'],
  },
  dishes: {
    type: String,
    required: [true, 'dishes Is Required'],
  },
  
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('Survey', surveySchema);