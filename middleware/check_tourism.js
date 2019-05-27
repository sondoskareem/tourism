const User = require("../modules/tourism");
var jwt = require('jsonwebtoken');

function check_Tourism(req, res, next) {

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
                    if (user) {
                        req.check_Tourism = user
                            next()
                    }
                })
    
            }); 
        } 

        catch (error) {
            // res.send(error)
        }
    } else {
        res.status(400).send({msg:'تحتاج الى تسجيل الدخول'})
    }

}


module.exports = check_Tourism;