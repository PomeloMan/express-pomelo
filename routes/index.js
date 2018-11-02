var
  express = require('express'),
  router = express.Router();
var
  CryptoType = require('../secure/crypto').CryptoType,
  CryptoUtil = require('../secure/crypto').CryptoUtil;
var
  authHeader = require('../config/app.config').authHeader;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/login', function (req, res, next) {
  var username = req.body.username || req.query.username;
  var password = req.body.password || req.query.password;

  var session = req.session;
  var token = CryptoUtil.encrypt('' + username + password, CryptoType.Private);

  session.token = token;
  res.setHeader(authHeader, session.token);

  res.redirect('/');
})

module.exports = router;