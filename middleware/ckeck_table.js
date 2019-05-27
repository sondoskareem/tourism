const Table = require("../modules/table");


function check_Table(req, res, next) {
    var table_id = req.body.table_id;
    if (table_id) {
        Table.findOne({
            _id: table_id
        }, (err, table) => {
            if (err) {
                res.status(401).send({
                    mgs: "حصل خطأ يرجى اعاده المحاولة"
                })
            }
            if (table) {
                req.check_Table = table
                next()
            }
        })
    } else {

        res.status(400).send({
            mgs: "حصل خطأ يرجى اعاده المحاولة"
        })
    }


}


module.exports = check_Table;