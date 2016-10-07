// applications.js

var jwt = require('jsonwebtoken');

module.exports = function(app, models) {

  app.get('/api/applications', function(req, res) {

    var token = req.headers['x-access-token'];

    if (token) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {

          models.Application.findAll({
              where: {
                ProfileID: decoded.ProfileID
              },
              include: [{
                model: models.Posting,
                include: [{
                  model: models.Profile,
                  include: [
                    models.Organization
                  ]
                }]
              }]
            })
            .then(function(applications) {
              for (i = 0; i < applications.length; i++) {
                applications[i].LdrPosting.LdrProfile.Password = undefined;
              }

              res.json({
                success: true,
                applications: applications
              });
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            });
        }
      });
    
    } else {
      res.status(403).json({
        success: false,
        message: 'No token provided.'
      });
    }
  });

}