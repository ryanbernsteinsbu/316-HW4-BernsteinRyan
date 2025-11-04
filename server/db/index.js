const db = require('./mongodb/index.js'); // TODO
db.on('error', console.error.bind(console, 'Database connection error:'))
const MongoDBM = require("./mongodb/MongoDBM.js");
const MongoPlaylist = require("../models/mongodb/playlist-model.js");
const MongoUser = require("../models/mongodb/user-model.js");

const dbm = new MongoDBM(db, MongoUser, MongoPlaylist);

module.exports = dbm;

