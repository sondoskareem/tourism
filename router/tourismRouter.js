const express = require('express');
const router = express.Router();
const User = require("../modules/tourism");
const check_admin = require('../middleware/check_admin');
const check_tourism = require('../middleware/check_tourism');
const bcrypt = require('bcrypt');
const Joi = require('joi');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var moment = require('moment');
const uuidv1 = require('uuid/v1');
const license_check = require("../middleware/license_check.1");

///////////////////////get profile for tourism

router.get('/me', license_check, (req, res) => {
  User.find({ _id: req.check_tourism._id })
    .select('_id email phone phone logo red rating pplCount lastSurvey licenseDate uptime')
    .then(result => {
      res.send({ profile: result })
    })
})

////////////////////////////get all tourism
router.get('/',
  check_admin,
  (req, res) => {
    User.find({})
      .then(result => {
        res.send(result)
      })
  })

////////////////////////////////tourism regester
router.post('/regester',
  check_admin,
  (req, res) => {
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
          var salt = bcrypt.genSaltSync(10);
          hash = bcrypt.hashSync(req.body.password, salt);
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email.toLowerCase(),
            phone: req.body.phone,
            password : hash,
            type: "tourism",
            licenseDate:req.body.license,
            logo: urlFile,
            // adminPassword:req.body.adminPassword,
            // last_rating: 0,
            rating: 0,
            pplCount: 0,
            lastSurvey:"21/05/1970, 2:49:00 pm",
            sum: 0,
            // red:false,
            uptime: moment().format('DD/MM/YYYY')
          });
          user.save()
            .then(result => {
              res.send({ msg: 'تمت اضافة المستخدم بنجاح' })
            })
            .catch(err => {
              res.status(401).send({ msg: 'حدث خطأ ما' });
            });

        } else {
          res.status(401).send({ msg: "file type should be image" })
        }
      } else {
        res.status(400).send({ msg: "image is Required" })
      }
    }
  });


router.post('/login',
  (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({
        email: req.body.email.toLowerCase()
      }, function (err, user) {
        if (err) {
          res.status(500).send({ msg: err })
        }
        if (user) {
          var usercheck = bcrypt.compareSync(req.body.password, user.password);
          if (usercheck) {
            var token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (32832000),
              id: user._id,
            }, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd');
            res.status(200).send({token : token })

          } else {
            res.status(401).send({ msg: 'الايميل او الباسورد غير صحيح' })
          }
        } else {
          res.status(401).send({ msg: 'الايميل او الباسورد غير صحيح' })
        }
      })

    } else {
      res.status(400).send({ msg: 'املئ الحقول المطلوبة' })

    }

  }
)

function userValidating(user) {
  const userSchema = {
    'email': Joi.string().email().required(),
    'password': Joi.string().required(),
    'phone': Joi.string().required(),
    'license' : Joi.string().required()

  }
  return Joi.validate(user, userSchema);
}
module.exports = router;
