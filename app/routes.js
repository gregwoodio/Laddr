// routes.js

var mysql = require('mysql');
var process = require('process');
if (process.env.NODE_ENV == 'test') {
  var db = require('../config/testdatabase');
} else {
  var db = require('../config/database')
}
var connection = mysql.createConnection(db.connection);

connection.connect();

if (process.env.NODE_ENV == 'test') {

  //for testing, work with empty database tables
  connection.query('DELETE FROM LdrComments');
  connection.query('DELETE FROM LdrTopics');
  connection.query('DELETE FROM LdrUsers');
  connection.query('DELETE FROM LdrOrganizations');
  connection.query('DELETE FROM LdrProfiles');
}

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
