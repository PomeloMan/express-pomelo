var express = require('express');
var router = express.Router();
// config
var appConfig = require('../config/app.config');
// db
var mongoClient = require('../db/mongodb');
var mysqlClient = require('../db/mysql');
// mock data
var listJson = require('../public/mock/user/list.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (appConfig.useMockData) {
    return res.json(listJson);
  } else {
    mysqlClient.exec('select * from sys_user').then(result => {
      return res.json(result);
    }).catch(err => next(err));
  }
});

router.post('/page', function (req, res, next) {
  let sql = 'select * from sys_user';
  let countSql = 'select count(*) as total from sys_user'
  sql += ` limit ${(req.body.pageIndex - 1) * req.body.pageSize}, ${req.body.pageSize}`;

  Promise.all([
    mysqlClient.exec(countSql).then(data => {
      return data.results[0].total;
    }),
    mysqlClient.exec(sql).then(data => {
      return data.results;
    })
  ]).then(([total, data]) => {
    const totalPages = total % req.body.pageSize > 0 ? Math.floor(total / req.body.pageSize) + 1 : total / req.body.pageSize;
    return res.json({
      content: data,
      totalElements: total,
      totalPages: totalPages,
      number: req.body.pageIndex - 1,
      size: req.body.pageSize,
      first: req.body.pageIndex === 1,
      last: req.body.pageIndex === totalPages
    })
  })
})

router.post('', function (req, res, next) {
  mysqlClient.pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.beginTransaction(function (err) {
      if (err) throw err;
      Promise.all([
        mysqlClient.exec(
          conn,
          `insert into sys_user (username, email, created_date, version) values ('${req.body.username}', '${req.body.email}', now(), 0)`,
        ).then(data => {
          return data
        }),
        mysqlClient.exec(
          conn,
          `insert into sys_user_roles (user_username, roles_name) values ('${req.body.username}', '${req.body.role}')`,
        ).then(data => {
          return data
        })
      ]).then(data => {
        conn.commit(() => {});
        return res.json(data);
      }).catch(err => {
        conn.rollback(() => {});
        next(err)
      })
    })
  })
})

router.get('/test', function (req, res, next) {
  mongoClient.connect().then((client) => {
    var users = client.db().collection('users');
    users.find({}).toArray((err, doc) => {
      if (err) next(err);
      return res.json(doc);
    })
  }).catch(err => next(err));
})

module.exports = router;