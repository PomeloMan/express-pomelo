var
    CryptoType = require('./crypto').CryptoType,
    CryptoUtil = require('./crypto').CryptoUtil;
var
    authHeader = require('../config/app.config').authHeader;
var
    UrlUtil = require('../util/url.util');

const ignores = [
    '/', '/login'
];

var authInterceptor = function (req, res, next) {
    var requestUrl = req.url;

    // ignore url end with '.*'
    if (UrlUtil.getUrlSuffix(requestUrl)) {
        return next();
    }
    // ignore url in ignores array
    var info = UrlUtil.parseUrl(requestUrl);
    if (ignores.includes(info.url)) {
        return next();
    }

    // do authentication
    var session = req.session;
    if (session.token) {
        var user = CryptoUtil.decrypt(session.token, CryptoType.Public);
        if (user)
            return next();
    }
    if (req.headers) {
        var auth = Object.keys(req.headers).findIndex((header) => header == authHeader)
        if (auth > -1) {
            var user = CryptoUtil.decrypt(auth, CryptoType.Public);
            if (user)
                return next();
        }
    }
    // auth failed
    res.redirect('/');
}

module.exports = authInterceptor;