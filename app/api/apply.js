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

    var token = req.headers['x-access-token'];

    if (token && req.body.PostingID != undefined && req.body.ApplicationStatus != undefined) {

     jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {

          models.Posting.findAll({
              where: {
                PostingID: req.body.PostingID,
                ProfileID: decoded.ProfileID
                // must be the same profile that created the posting
              }
            })
            .then(function(posting) {

              if (posting.length > 0) {
                models.Application.update({
                    ApplicationStatus: req.body.ApplicationStatus
                  }, {
                    where: {
                      PostingID: posting[0].dataValues.PostingID
                    }
                  })
                  .then(function(application) {
                    res.json({
                      success: true,
                      message: 'Application updated.'
                    })
                  })
                  .catch(function(err) {

                    console.log('apply.js - ' + err.message);

                    res.status(500).json({
                      success: false,
                      message: err.message
                    });
                  });  
              } else {
                res.status(403).json({
                  success: false,
                  message: 'This isn\'t your posting, you can\'t edit it.'
                });
              }
              
            })
            .catch(function(err) {

              console.log('apply.js - ' + err.message);

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

  app.delete('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
}