// routes.js

var models = require('./models');

if (process.env.NODE_ENV == 'test') {

  //for testing, work with empty database tables
  models.sequelize.query('DELETE FROM LdrComments');
  models.sequelize.query('DELETE FROM LdrTopics');
  models.sequelize.query('DELETE FROM LdrPostings');
  models.sequelize.query('DELETE FROM LdrUsers');
  models.sequelize.query('DELETE FROM LdrOrganizations');
  models.sequelize.query('DELETE FROM LdrProfiles');

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
  var changepassword = require('./api/password')(app, models);

  //social routes
  var twitter = require('./api/twitter')(app, passport);


  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/*', function(req, res) {
  	res.sendFile(__dirname + '/public/app.html');
  });
};
