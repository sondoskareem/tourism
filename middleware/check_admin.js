const Admin = require("../modules/admin");
var jwt = require('jsonwebtoken');

function check_admin(req, res, next) {

    var token = req.headers.token || req.body.token
    if (token) {
      
            jwt.verify(token, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd', function (err, decoded) {
                if (err) {
                    res.status(401).send({msg:" حصل خطأ ما"}) 
                }
                Admin.findOne({
                    _id: decoded.id
                }, (err, user) => {
                    if (err) {
                        res.status(401).send({msg:"  حصل خطأ ما "})
                    }
                    
                    if (user) {
                        req.check_admin = user
                        next()
      
                    }else{
                        res.status(401).send({msg :"غير مسوح"})
                    }
    
                })
    
            }); 
    } else {
        res.status(400).send({mgs:'تحتاج الى تسجيل الدخول'})
    }

}


module.exports = check_admin;