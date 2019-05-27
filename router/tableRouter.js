const express = require('express');
const router = express.Router();
const Table = require("../modules/table");
const check_login = require("../middleware/ckeck_login");

const license_check = require("../middleware/license_check");

const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const Delete_table = require("../middleware/Delete_table");


//////////////////////////  delete table by id
router.post('/delete/',
check_login,
  Delete_table,
  license_check,
  (req, res) => {
    Table.deleteOne({ _id: req.body.table_id })
      .then(result => {
        res.status(200).send({msg : 'تم حذف الطاوله'})
      })
      .catch((err, affacted, res) => {
        res.status(401).send(err)
      })
  })


///////////////////////////////////get table by user_id

router.get('/',
  check_login,
  license_check,
  (req, res) => {
    Table.find({ user_id:req.check_login.comp_id}).select('_id name uptime last_rating red rating lastSurvey pplCount') .sort({
      red: -1
    })
      .then(result => {
        res.status(200).send({tables : result})

      }) 
      .catch((err, affacted, res) => {
        res.status(401).send(err)
      })
  })


//////////////////////////////////add table
router.post('/add',
  check_login,
  license_check,
  (req, res) => {
    const validating = userValidating(req.body);
    if (validating.error) {
      res.status(401).send(validating.error.details[0].message)
    } else {
      const table = new Table({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.check_login.comp_id,
        name: req.body.name,
        last_rating: 0,
        rating: 0,
        pplCount: 0,
        lastSurvey:"21/05/1970, 2:49:00 pm",
        sum: 0,
        red:false,
        uptime: moment().format('DD/MM/YYYY')

      });
      table.save()
        .then(result => {
          res.send({msg : "تم اضافه الطاوله" })
        })
        .catch(err => {
          res.status(401).send(err);
        });
    }

  });

function userValidating(table) {
  const tableSchema = {
    'name': Joi.string().required()

  }
  return Joi.validate(table, tableSchema);
}
module.exports = router;