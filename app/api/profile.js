// profile.js

jwt = require('jsonwebtoken');
mw = require('../middleware');

module.exports = function(app, models) {

	//logs into our system, returns a token
	app.get('/api/profile', mw.verifyToken, function(req, res) {
          
    if (req.decoded.AccountType == 0) {
      models.Profile.find({
        where: {
          ProfileID: req.decoded.ProfileID,
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
    } else if (req.decoded.AccountType == 1) {
      models.Profile.find({
        where: {
          ProfileID: req.decoded.ProfileID,
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