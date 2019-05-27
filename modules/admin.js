const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type : String ,
        required : [true , 'name is required']
        
    } ,
    email:{
        unique: true,
        type: String,
        required: [true, 'email is Required'],
    },
    password:{
        type: String,
        required: [true, 'password is Required'],
          },

    role:{
        type: Number,
        required: [true, 'role Is Required'],
        },
    uptime: {
        type: String,
           },
        
    
})
module.exports = mongoose.model('Admin', adminSchema);
