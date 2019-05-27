const express = require('express');
const router = express.Router();
const User = require("../modules/user");
const check_login = require("../middleware/ckeck_login");
const check_admin = require('../middleware/check_admin');
const bcrypt = require('bcrypt');
const Joi = require('joi');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var moment = require('moment');
const uuidv1 = require('uuid/v1');
const license_check = require("../middleware/license_check");

///////////////////////get profile

router.get('/me', check_login,    license_check, (req, res) => {
  User.find({ _id: req.check_login._id })
  .select('_id email adminPassword name type page_name phone logo uptime discount licenseDate')
    .then(result => {
      res.send({ profile: result })
    })
})

////////////////////////////get all users
router.get('/', 
check_admin , 
(req, res) => {
  User.find({})
    .then(result => {
      res.send(result)
    })
})

////////////////////////////////
router.post('/add', 
check_admin , 
(req, res) => {
  console.log(req.body)
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(401).send(validating.error.details[0].message)
  } else {
    if (req.files) {
      var file = req.files.file;
      var changetype = file.mimetype.split("/", 1);
      if (changetype == 'image') {
        let name = file.name;
        var FileUud = uuidv1();
        var Filepath = "./public/" + FileUud + name;
        var urlFile = FileUud + name;
        file.mv(Filepath);
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email.toLowerCase(),
          name: req.body.name,
          page_name: req.body.page_name,
          phone: req.body.phone,
          discount: req.body.discount,
          type: "res",
          logo: urlFile,
          // adminPassword:req.body.adminPassword,
          uptime: moment().format('DD/MM/YYYY')
        });
        user.save()
          .then(result => {
            res.send(result)
          })
          .catch(err => {
            res.status(401).send(err);
          });

      } else {
        res.status(401).send({msg:"file type should be image"})
      }
    } else {
      res.status(400).send({msg:"image is Required"})
    }
  }


});



function userValidating(user) {
  const userSchema = {
    'email': Joi.string().email().required(),
    'discount':Joi.number().required(),
    'name': Joi.string().required(),
    'phone': Joi.string().required(),
    'page_name': Joi.string().required(),
    // 'adminPassword' : Joi.string().required()

  }
  return Joi.validate(user, userSchema);
}
module.exports = router;
