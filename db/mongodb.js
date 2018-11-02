const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/db.config').mongodb;

// Connection URL
// const url = 'mongodb://localhost:27017';
const url = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}?authMechanism=${dbConfig.authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(url); 

module.exports = client;