var
    config = require('../config/app.config'),
    fs = require('fs'),
    crypto = require('crypto'),
    prvKey = loadKey('./secure/rsa-prv.pem'),
    pubKey = loadKey('./secure/rsa-pub.pem');

function loadKey(file) {
    return fs.readFileSync(file, config.encoding);
}

const CryptoType = {
    Private: 1,
    Public: 2
}

/**
 * 使用私钥加密，公钥解密
 * 或使用公钥加密，私钥解密
 * （注）
 * 不能使用私钥加密，私钥解密
 * 或公钥加密，公钥解密
 */
class CryptoUtil {

    static encrypt(data, type) {
        if (CryptoType.Private == type) {
            return crypto.privateEncrypt(prvKey, new Buffer(data)).toString(config.base64);
        } else if (CryptoType.Public == type) {
            return crypto.publicEncrypt(pubKey, new Buffer(data)).toString(config.base64);
        }
    }

    static decrypt(data, type) {
        if (CryptoType.Private == type) {
            return crypto.privateDecrypt(prvKey, new Buffer(data, config.base64)).toString(config.encoding);
        } else if (CryptoType.Public == type) {
            return crypto.publicDecrypt(pubKey, new Buffer(data, config.base64)).toString(config.encoding);
        }
    }
}

module.exports.CryptoType = CryptoType;
module.exports.CryptoUtil = CryptoUtil;