const mysql = require('mysql'); // mysql node driver
const dbConfig = require('../config/db.config');

const pool = mysql.createPool({
    connectionLimit: 10, // 连接数量
    host: dbConfig.mysql.host,
    port: dbConfig.mysql.port,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database
});

var _client = {
    query: function (sql) {
        return new Promise(function (resolve, reject) {
            pool.query(sql, function (err, results, fields) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        results: results
                        // fields: fields
                    })
                }
            });
        })
    }
}

module.exports = _client;