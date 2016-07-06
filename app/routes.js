// routes.js

var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db.connection);

connection.connect();

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        console.log('Index.html');
        res.sendFile(__dirname + '/public/index.html');
    });

    var login = require('./login')(app, connection);
    var profile = require('./profile')(app, connection);

    // API routes
    var user = require('./user')(app, connection);
    var organization = require('./organization')(app, connection);
    var comment = require('./comment')(app, connection);
    var topic = require('./topic')(app, connection);
    var posting = require('./posting')(app, connection);
    
};
