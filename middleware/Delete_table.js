const jwt = require('jsonwebtoken');
const Survey = require('../modules/survey');

//here to check file belong to same user when user want to delete the file or move it 
function FilesUpdate(req, res, next) {
  //  check if there is a token

  const token = req.body.token || req.headers.token

  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken
        var payload = jwt.verify(token, 'Tab3@kjafsjawdjjkjkwejkw9022320-12###2323AbCeDsdsdsd');
        Survey.find({
            table_id: req.body.table_id,
        }, {},
          function (err, doc) {
            if (err) return res.status(500).send({msg : "هناك مشكلة في ايجاد الملف"});
            if (!doc) return res.status(404).send({msg : "لايوجد ملف" });
                if (doc.length != 0 ) {
                    res.status(401).send({msg:`لا يمكنك حذف هذه الطاولة لانها تحتوى على ${doc.length} تقيم`});
                }else{
                    next();
                    // res.send(doc)
                }
          })
      } catch (err) {
        res.status(401).send({msg : "حصل خطأ"}); 
      }
    }
  } else {
    res.status(400).send({mgs:'تحتاج الى تسجيل الدخول'});
  }
}


module.exports = FilesUpdate;