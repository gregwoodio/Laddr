// routes.js

var mysql = require('mysql');
var db = require('../config/database');
var connection = mysql.createConnection(db.connection);

connection.connect();

module.exports = function(app) {

	// API routes
  var login = require('./api/login')(app, connection);
  var profile = require('./api/profile')(app, connection);
  var user = require('./api/user')(app, connection);
  var organization = require('./api/organization')(app, connection);
  var comment = require('./api/comment')(app, connection);
  var topic = require('./api/topic')(app, connection);
  var posting = require('./api/posting')(app, connection);
  
  app.get('/', function(req, res) {
    console.log('Index.html');
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/*', function(req, res) {
  	res.sendFile(__dirname + '/public/app.html');
  });
};
