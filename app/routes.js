// routes.js

var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db.connection);

connection.connect();

module.exports = function(app) {

    var user = require('./user')(app, connection);
    var organization = require('./organization')(app, connection);
    var comment = require('./comment')(app, connection);
    var topic = require('./topic')(app, connection);
    var posting = require('./posting')(app, connection);
    
};
