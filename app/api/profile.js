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
          
          if (decoded.AccountType == 0) {
            models.Profile.find({
              where: {
                ProfileID: decoded.ProfileID,
              },
              include: {
                model: models.User
              }
            })
            .then(function(results) { 
              res.json(results);
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            });
          } else if (decoded.AccountType == 1) {
            models.Profile.find({
              where: {
                ProfileID: decoded.ProfileID,
              },
              include: {
                model: models.Organization
              }
            })
            .then(function(results) { 
              res.json(results);
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
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