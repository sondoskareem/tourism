const express = require('express');
const router = express.Router();
const Admin = require('../modules/admin');
const User = require('../modules/user');
const Account = require('../modules/account');
const bcrypt = require('bcrypt');
const Joi = require('joi');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var moment = require('moment');

const check_admin = require("../middleware/check_admin");

////////////////////////////////admin regestration


router.get('/companies',  check_admin,  (req, res) => {
  User.find()
  // .select('')
    .then(result => {
      res.send({ companies: result })
    })
})


router.get('/accounts',  check_admin,  (req, res) => {
  Account.find().populate('comp_id')
  .select('_id email adminPassword name comp_id phone type licenseDate uptime')
    .then(result => {
      res.send({ companies: result })
    })
})


router.post('/adminRegester', (req, res) => {
    const validating = userValidating(req.body);
    if (validating.error) {
      res.status(400).send(validating.error.details[0].message)
    } else {
          var salt = bcrypt.genSaltSync(10);
          hash = bcrypt.hashSync(req.body.password, salt);
          const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email.toLowerCase(),
            password: hash,
            name: req.body.name,
            role : 0,
            uptime: moment().format('DD/MM/YYYY')
  
          });
          admin.save()
            .then(result => {
              var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (32832000), ////////
                id: admin._id,
              }, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd'); /////
              res.send({ msg: "تم اضافة الادمن بنجاح",
                          token : token })
            })
            .catch(err => {
              res.status(401).send({ msg : " حصل خطأ ما"});
            });
    }
  });

  router.post('/login',
  (req, res) => {
    if (req.body.email && req.body.password) {
      Admin.findOne({
        email: req.body.email.toLowerCase()
      }, function (err, user) {
        if (err) {
          res.status(500).send({ msg : "حصل خطأ ما"})
        }
        if (user) {
          var admincheck = bcrypt.compareSync(req.body.password, user.password);
          if (admincheck) {
            // var login_id=Date.now()+user._id;
            var token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (32832000), //////////////////
              id: user._id,
            }, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd');      /////////////////////////
            res.status(200).send({token:token});
          } else {
            res.status(401).send({msg:'الايميل او الباسورد غير صحيح'})
          }
        } else {
          res.status(401).send({msg:'لا يوجد مستخدم بهذا الايميل'})
        }
      })

    } else {
      res.status(400).send({msg:'يرجى ملئ المعلومات المطلوبه '})

    }
})

function userValidating(user) {
  const userSchema = {
    'email': Joi.string().email().required(),
    'password': Joi.string().min(4).required(),
    'name': Joi.string().required(),
  }
  return Joi.validate(user, userSchema);
}
module.exports = router;

  

  