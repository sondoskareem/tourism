const User = require("../modules/tourism");
var jwt = require('jsonwebtoken');
var moment = require('moment');
function license_check(req, res, next) {
    var token = req.headers.token
    if (token) {
        try {
            jwt.verify(token, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd', function (err, decoded) {
                if (err) {
                    res.status(400).send({msg : "حصل خطأ"}) 
                }
                User.findOne({
                    _id: decoded.id
                }, (err, user) => {
                    if (err) {
                        res.status(401).send({msg : "هناك خطأ "})
                    }
                    if (user) {
                        var ex=moment((new Date(user.licenseDate))).format('MM/DD/YYYY'); 
                        var now=moment(Date.now()).format('MM/DD/YYYY');
                        if (ex>=now) {
                            next()
                        }else{
                            res.status(401).send({msg:"انتهت مدة الصلاحية"});
                        }
                    
      
                    }
    
                })
    
            }); 
        } 

        catch (error) {

        }
    } else {
        res.status(400).send({mgs:'تحتاج الى تسجيل الدخول'})
    }

}


module.exports = license_check;