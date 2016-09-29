// apply.js

var jwt = require('jsonwebtoken');

module.exports = function(app, models) {

  app.post('/api/apply', function(req, res) {

    var token = req.headers['x-access-token'];

    if (token && req.body.PostingID != undefined) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {

          models.Application.build({
              ProfileID: decoded.ProfileID,
              PostingID: req.body.PostingID,
              ApplicationStatus: 0
            })
            .save()
            .then(function(application) {
              res.json({
                success: true,
                message: 'Thanks for applying.'
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

  app.get('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
}