const User = require("../modules/account");
var jwt = require('jsonwebtoken');

function checklogin(req, res, next) {

    var token = req.headers.token
    if (token) {
        try {
            jwt.verify(token, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd', function (err, decoded) {
                if (err) {
                    res.status(401).send({msg:" حصل خطأ "}) 
                }
                User.findOne({
                    _id: decoded.id
                }, (err, user) => {
                    if (err) {
                        res.status(401).send({msg:" حصل خطأ "})
                    }
                    try {
                        if (user.lastLogin == decoded.login_id) {
                            req.check_login = user
                            next()
          
                        }else{
                            res.status(401).send({msg:"هذا الحساب قيد الاستخدام"})
                        } 
                    } catch (error) {
                        res.status(401).send({msg:"خطأ في المعلومات"})
                        
                    }

    
                })
    
            }); 
        } 

        catch (error) {
            // res.send(error)
        }
    } else {
        res.status(400).send({msg:'لايوجد حساب '})
    }

}


module.exports = checklogin;