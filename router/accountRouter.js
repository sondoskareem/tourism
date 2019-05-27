const express = require('express');
const router = express.Router();
const User = require("../modules/account");
const check_login = require("../middleware/ckeck_login");
const check_admin = require("../middleware/check_admin");
const bcrypt = require('bcrypt');
const Joi = require('joi');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var moment = require('moment');
const uuidv1 = require('uuid/v1');
const license_check = require("../middleware/license_check");

///////////////////////get profile

router.get('/me', check_login,license_check, (req, res) => {
  User.find({ _id: req.check_login._id })
   .select('_id licenseDate adminPassword comp_id ').populate('comp_id')

  .select('_id email adminPassword name type page_name phone logo uptime discount licenseDate')
    .then(result => {
      let data=[];

      res.send({ profile: result })
    })
})

////////////////////////////get all account
router.get('/', (req, res) => {
  User.find({comp_id : req.body.comp_id})
    .then(result => {
      res.send(result)
    })
})

router.post('/regestration',
check_admin , 
 (req, res) => {
  const validating = userValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error.details[0].message)
  } else {
        var salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email.toLowerCase(),
          password: hash,
          adminPassword: req.body.admin_password,
          name: req.body.name,
          phone: req.body.phone,
          comp_id: req.body.comp_id,
          lastLogin: 'NAN',
          type: "res",
          licenseDate:req.body.license,
          uptime: moment().format('DD/MM/YYYY')

        });
        user.save()
          .then(result => {
            res.send({ msg: "تمت اضافة المتسخدم بنجاح" })
          })
          .catch(err => {
            res.status(401).send({msg : "حدث خطأ ما"});
          });
  }


});


router.post('/login' , 
  (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({
        email: req.body.email.toLowerCase()
      }, function (err, user) {
        if (err) {
          res.status(500).send(err)
        }
        if (user) {
          var usercheck = bcrypt.compareSync(req.body.password, user.password);
          if (usercheck) {
            var login_id=Date.now()+user._id;
            var token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (32832000),
              id: user._id,
              login_id:login_id
            }, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd');
            var tokenObj = {
              token: token
            }

            User.updateOne({
              _id: user._id
          }, {
              $set: {
                  "lastLogin": login_id
              }

          }, {
              new: true
          })  .then(result => {
       res.status(200).send(tokenObj)
          })
          .catch(err => {
            res.status(401).send({msg : "حصل خطأ ما"});
          });
         
          } else {
            res.status(401).send({msg:'الايميل او الباسورد غير صحيح'})
          }
        } else {
          res.status(401).send({msg:'الايميل او الباسورد غير صحيح'})
        }
      })

    } else {
      res.status(400).send({msg:'املئ الحقول المطلوبة'})

    }

  }
)

function userValidating(user) {
  const userSchema = {
    'email': Joi.string().email().required(),
    'password': Joi.string().min(4).required(),
    'name': Joi.string().required(),
    'comp_id': Joi.string().required(),
    'phone': Joi.string().required(),
    'admin_password': Joi.string().required(),
    'license':Joi.string().required(),

  }
  return Joi.validate(user, userSchema);
}
module.exports = router;
