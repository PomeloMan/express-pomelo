var express = require('express');
var router = express.Router();
// config
var appConfig = require('../config/app.config');
// db
// var mongoClient = require('../db/mongodb');
var mysqlClient = require('../db/mysql');

/** [GET] List */
router.get('', function (req, res, next) {
    if (appConfig.useMockData) {
        return res.json(listJson);
    } else {
        mysqlClient.exec('select * from sys_role').then(result => {
            return res.json(result);
        }).catch(err => next(err));
    }
});

/** [POST] Save */
router.post('', function (req, res, next) {
    mysqlClient.exec(
        `insert into sys_role (name, status, created_date, version) values ('${req.body.name}', 1, now(), 0)`
    ).then(data => {
        return res.json(data);
    }).catch(err => next(err))
})

/** [DELETE] Delete */
router.delete('', function (req, res, next) {
    mysqlClient.exec(
        `delete from sys_role where name = '${req.query.name}'`
    ).then(data => {
        return res.json(data);
    }).catch(err => next(err))
})

module.exports = router;