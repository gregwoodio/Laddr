// routes.js

//var mysql = require('mysql');
// var process = require('process');
// if (process.env.NODE_ENV == 'test') {
//   var db = require('../config/testdatabase');
// } else {
//   var db = require('../config/database')
// }
//var connection = mysql.createConnection(db.connection);
// var connection = require('knex')(db);
// var Bookshelf = require('bookshelf')(connection);
var models = require('./models');
// connection.connect();

if (process.env.NODE_ENV == 'test') {

  //for testing, work with empty database tables
  models.sequelize.query('DELETE FROM LdrComments');
  models.sequelize.query('DELETE FROM LdrTopics');
  models.sequelize.query('DELETE FROM LdrPostings');
  models.sequelize.query('DELETE FROM LdrUsers');
  models.sequelize.query('DELETE FROM LdrOrganizations');
  models.sequelize.query('DELETE FROM LdrProfiles');

  // models.Bookshelf.knex('LdrComments').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrComments');
  //   });
  // models.Bookshelf.knex('LdrTopics').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrTopics');
  //   });
  // models.Bookshelf.knex('LdrPostings').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrPostings');
  //   });
  // models.Bookshelf.knex('LdrUsers').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrUsers');
  //   });
  // models.Bookshelf.knex('LdrOrganizations').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrOrganizations');
  //   });
  // models.Bookshelf.knex('LdrProfiles').del()
  //   .then(function(count) {
  //     console.log('Deleted ' + count + ' rows from LdrProfiles');
  //   });

}

module.exports = function(app, passport) {

	// API routes
  var login = require('./api/login')(app, passport);
  var profile = require('./api/profile')(app, passport);
  var user = require('./api/user')(app, models);
  var organization = require('./api/organization')(app, models);
  var topic = require('./api/topic')(app, models);
  var comment = require('./api/comment')(app, models);
  var posting = require('./api/posting')(app, models);


  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/*', function(req, res) {
  	res.sendFile(__dirname + '/public/app.html');
  });
};
