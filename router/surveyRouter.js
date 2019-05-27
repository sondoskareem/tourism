const express = require('express');
const router = express.Router();
const Survey = require("../modules/survey");
const Table = require("../modules/table");
const check_login = require("../middleware/ckeck_login");
const ckeck_table = require("../middleware/ckeck_table");
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const license_check = require("../middleware/license_check");
///////////////////////////////////get survey by user_id

router.get('/',
    check_login,
    license_check,
    (req, res) => {
        Survey.find({
                user_id: req.check_login.comp_id
            })
            .then(result => {
                res.send({
                    survey: result
                })

            })
            .catch((err, affacted, res) => {
                res.status(401).send({msg : "حصل خطأ ما"})

            })
    })


//////////////////////////  get survey by table_id
router.get('/table',check_login,  license_check,   (req, res) => {
    const validating = surveyViewValidating(req.query);
    if (validating.error) {
        res.status(400).send(validating.error.details[0].message)
    } else {
        Survey.find({
                table_id: req.query._id,
                user_id: req.check_login.comp_id
            }).sort({
                uptime: -1
            })
            .then(result => {
                res.send({
                    survey: result
                })

            })
            .catch((err, affacted, res) => {
                res.status(401).send(err)
            })
        }


    })

//////////////////////////////////add survey by table_id
router.post('/add', check_login, ckeck_table,    license_check, (req, res) => {
    const validating = userValidating(req.body);
    if (validating.error) {
        res.status(400).send(validating.error.details[0].message)
    } else {
        var sumOfRating = parseFloat(req.body.service) +
            parseFloat(req.body.cleanliness) +
            parseFloat(req.body.food_assessment) +
            parseFloat(req.body.wc) +
            parseFloat(req.body.atmosphere)
        var avg = (sumOfRating / 5).toFixed(2);
        var floatAvg = parseFloat(avg);
        var rating;
        var ppcount=req.check_Table.pplCount+1;
        var sum=parseFloat(req.check_Table.sum)+floatAvg

        if (req.check_Table.rating != 0) {
            // var ratingAvg = parseFloat(req.check_Table.rating) + floatAvg
            rating = sum / ppcount
        } else {
            rating = floatAvg;
        }
        var date= moment().format('DD/MM/YYYY, h:mm:ss a');
        const survey = new Survey({
            _id: new mongoose.Types.ObjectId(),
            user_id: req.check_login.comp_id,
            table_id: req.body.table_id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            service: req.body.service,
            people_number: req.body.people_number,
            cleanliness: req.body.cleanliness,
            food_assessment: req.body.food_assessment,
            wc: req.body.wc,
            atmosphere: req.body.atmosphere,
            recommended: req.body.recommended,
            dishes: req.body.dishes,
            uptime:date

        });
        survey.save();
        var status;
        if (floatAvg < 3 || req.body.recommended == "false") {
            status = true;
        } else {
            status = false;
        }
        Table.updateOne({
                _id: req.body.table_id
            }, {
                $set: {
                    "red": status,
                    "last_rating": floatAvg,
                    "pplCount":ppcount,
                    "sum":sum,
                    "rating": (parseFloat(rating)).toFixed(2),
                    "lastSurvey":date,
                }

            }, {
                new: true
            })
            .then(result => {
                res.status(200).send({
                    msg: "شكرا لتقيمك لنا"
                })
            })
            .catch(err => {
                res.status(401).send(err);
            });
    }

});



function surveyViewValidating(survey) {
    const surveyViewSchema = {
        '_id': Joi.string().required(),
    }
    return Joi.validate(survey, surveyViewSchema);
}

function userValidating(survey) {
    const SurveySchema = {
        'name': Joi.string().required(),
        'age': Joi.string().required(),
        'email': Joi.string().required(),
        'table_id': Joi.string().required(),
        'phone': Joi.string().required(),
        'service': Joi.number().required(),
        "people_number": Joi.number().required(),
        'cleanliness': Joi.number().required(),
        'food_assessment': Joi.number().required(),
        'wc': Joi.number().required(),
        'atmosphere': Joi.number().required(),
        'recommended': Joi.boolean().required(),
        'dishes': Joi.string().required(),

    }
    return Joi.validate(survey, SurveySchema);
}
module.exports = router;