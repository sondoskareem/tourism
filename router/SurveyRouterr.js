const express = require('express');
const router = express.Router();
const Survey = require("../modules/Survey2");
const Table = require("../modules/tourism");
const Joi = require('joi');
const mongoose = require('mongoose');
var moment = require('moment');
const license_check = require("../middleware/license_check.1");
const check_Tourism = require("../middleware/check_tourism");

/////////////////////////// get survey by tourism_id
router.get('/surveies' ,check_Tourism, (req , res) => {
    Survey.find({ tourism_id: req.check_Tourism._id })
    .select('name email phone server note status uptime')
    .sort({uptime:1})
    .then(result => {
        res.send({surveies:result})
        // res.send(result)
    }) 
})

//////////////////////////////////add survey
router.post('/submit',license_check,check_Tourism, (req, res) => {
    const validating = userValidating(req.body);
    if (validating.error) {
        res.status(400).send(validating.error.details[0].message)
    } else {
        
        var floatAvg = parseInt(req.body.status)
        var rating;
        var ppcount=req.check_Tourism.pplCount+1;
        var sum=parseFloat(req.check_Tourism.sum)+floatAvg

        if (req.check_Tourism.rating != 0) {
            rating = sum / ppcount
            if (rating > 3){
                rating = 3;
            }
        } else {
            if(floatAvg>3){floatAvg=3}
            rating = floatAvg;
        }
        var date= moment().format('DD/MM/YYYY, h:mm:ss a');
        const survey = new Survey({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            tourism_id: req.check_Tourism._id,
            phone: req.body.phone,
            server: req.body.server,
            note: req.body.note,
            status: req.body.status,
            uptime:date

        });
        survey.save();
        var status;
        if (floatAvg < 3 ) {
            status = true;
        } else {
            status = false;
        }
        Table.updateOne({
                _id: req.check_Tourism._id
            }, {
                $set: {
                    "pplCount":ppcount,
                    "sum":sum,
                    "rating": (parseInt(rating)),
                    "lastSurvey":date,
                }

            }, {
                new: true
            })
            .then(result => {
                res.status(200).send({
                    response: {msg : "Done"}
                })
            })
            .catch(err => {
                res.status(401).send(err);
            });
    }

});


function userValidating(survey) {
    const SurveySchema = {
        'name': Joi.string().required(),
        'email': Joi.string().required(),
        'phone': Joi.number().required(),
        'status': Joi.number().required(),
        "note": Joi.string().required(),
        // "region": Joi.string().required(),
        "server": Joi.string().required(),
        

    }
    return Joi.validate(survey, SurveySchema);
}
module.exports = router;