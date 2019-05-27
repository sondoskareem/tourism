 
const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tourism_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourism',
    required: true
  },
  name: {
    type: String,
    required: [true, 'name Is Required'],
  },
  email: {
    type: String,
    required: [true, 'email Is Required'],
  },
  phone: {
    type: Number,
    required: [true, 'phone Is Required'],
  },
  // region: {
  //   type: String,
  //   required: [true, 'region Is Required'],
  // },
  server: {
    type: String,
    required: [true, 'employee Is Required'],
  },
  note: {
    type: String,
    required: [true, 'note Is Required'],
  },
  status: {
    type: Number,
    required: [true, 'survey Is Required'],
  },
  uptime: {
    type: String,
   
  },

});

module.exports = mongoose.model('Surveyy', surveySchema);