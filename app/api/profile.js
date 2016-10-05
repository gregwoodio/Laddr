// profile.js

jwt = require('jsonwebtoken');

module.exports = function(app, models) {

	//logs into our system, returns a token
	app.get('/api/profile', function(req, res) {

    token = req.headers['x-access-token'];

    if (token) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {

          // why are joins so tough in Sequelize? Raw queries FTW.
          // TODO: Take out the trash.
          if (decoded.AccountType == 0) {
            models.sequelize.query('SELECT * FROM LdrProfiles p INNER JOIN LdrUsers u ON ' +
              'p.ProfileID = u.ProfileID WHERE p.ProfileID =  "' + decoded.ProfileID + '"',
              {type: models.sequelize.QueryTypes.SELECT})
            .then(function(results) { 
              res.json(results[0]);
            });
          } else if (decoded.AccountType == 1) {
            models.sequelize.query('SELECT * FROM LdrProfiles p INNER JOIN LdrOrganizations o ON ' +
              'p.ProfileID = o.ProfileID WHERE p.ProfileID = "' + decoded.ProfileID + '"',
              {type: models.sequelize.QueryTypes.SELECT})
            .then(function(results) { 
              res.json(results[0]);
            });
          }
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No token provided."
      });
    }
  
  });

  app.post('/api/profile', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/profile', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/profile', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
};