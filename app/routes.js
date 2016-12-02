// routes.js

var models = require('./models');

if (process.env.NODE_ENV == 'test') {

  //for testing, work with empty database tables
  models.sequelize.query('DELETE FROM LdrComments');
  models.sequelize.query('DELETE FROM LdrTopics');
  models.sequelize.query('DELETE FROM LdrApplications');
  models.sequelize.query('DELETE FROM LdrPostings');
  models.sequelize.query('DELETE FROM LdrUsers');
  models.sequelize.query('DELETE FROM LdrOrganizations');
  models.sequelize.query('DELETE FROM LdrProfiles');

}

module.exports = function(app, passport) {

	// API routes
  var login = require('./api/login')(app, passport);
  var profile = require('./api/profile')(app, models);
  var user = require('./api/user')(app, models);
  var organization = require('./api/organization')(app, models);
  var topic = require('./api/topic')(app, models);
  var comment = require('./api/comment')(app, models);
  var posting = require('./api/posting')(app, models);
  var changepassword = require('./api/password')(app, models);
  var apply = require('./api/apply')(app, models);
  var applications = require('./api/applications')(app, models);
  var applicants = require('./api/applicants')(app, models);
  var tags = require('./api/tag')(app, models);
  var profiletags = require('./api/profiletags')(app, models);
  var imageupload = require('./api/imageupload')(app, models);
  var feed = require('./api/feed')(app, models);
  var events = require('./api/events')(app, models);

  //social routes
  var twitter = require('./api/twitter')(app, passport);

  app.get('/policy', function(req, res) {
    res.sendFile(__dirname + '/public/policy/index.html');
  })

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.get('/*', function(req, res) {
  	res.sendFile(__dirname + '/public/index.html');
  });
};
