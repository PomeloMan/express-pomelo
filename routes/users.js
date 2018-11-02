var express = require('express');
var router = express.Router();

// db
var mongoClient = require('../db/mongodb');
var mysqlClient = require('../db/mysql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  mysqlClient.select('select * from city').then(data => {
    return res.json(data);
  }).catch(err => next(err));
});

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