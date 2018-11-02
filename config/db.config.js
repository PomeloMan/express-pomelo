config = {
    mysql: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'world'
    },
    mongodb: {
        user: encodeURIComponent('pomelor'),
        password: encodeURIComponent('pomelor'),
        host: 'localhost',
        port: '27017',
        dbName: 'pomelo',
        authMechanism: 'DEFAULT'
    }
}

module.exports = config;