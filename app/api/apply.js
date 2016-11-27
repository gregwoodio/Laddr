// apply.js

var mw = require('../middleware');
var request = require('request');

module.exports = function(app, models) {

  app.post('/api/apply', mw.verifyToken, function(req, res) {

    models.Application.findAll({
      where: {
        ProfileID: req.decoded.ProfileID,
        PostingID: req.body.PostingID,
      }
    })
    .then(function(application) {
      if (application.length == 0) {
        models.Application.build({
            ProfileID: req.decoded.ProfileID,
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
      } else {
        res.json({
          success: false,
          message: 'You\'ve already applied to this job.'
        });
      }
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
          
  });

  app.get('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/apply', mw.verifyToken, function(req, res) {

    models.Posting.findAll({
        where: {
          PostingID: req.body.PostingID,
          ProfileID: req.decoded.ProfileID
          // must be the same profile that created the posting
        }
      })
      .then(function(posting) {

        if (posting.length > 0) {
          models.Application.update({
              ApplicationStatus: req.body.ApplicationStatus
            }, {
              where: {
                PostingID: posting[0].dataValues.PostingID,
                ProfileID: req.body.ProfileID
              }
            })
            .then(function(application) {

              if (req.body.ApplicationStatus == 2) {

                message = 'Your volunteer application to ' + posting[0].dataValues.JobTitle + ' was accepted!';

                // FCM notification to user
                models.User.find({
                  where: {
                    ProfileID: req.body.ProfileID
                  }
                })
                .then(function(user) {
                  request({
                    url: 'https://fcm.googleapis.com/fcm/send',
                    method: 'post',
                    headers: {
                      "Authorization": 'key=AAAASUh07ZY:APA91bHNEbOakmRDVLtV4OovZhN36PE7dmwStkBCqWrld-YwAk07BUH45yctMyjsHVYBJmFJR0aRil5hvX4ISmMApOW5a5QRya5eVtF9a7w8G3iKLpne_Tq2s4LPYIaZQGt9QYQtw5nFMZYK45efiY6M34ZljDIVTw',
                      "Content-Type": 'application/json'
                    },
                    json: {
                      'to': user.Fdi,
                      'notification':   {
                        'body': message
                      }
                    }
                  }, function(err, response, body) {
                    console.log(response);
                    // res.json({
                    //   response
                    // });
                  });
                }

              }

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
  }); 

  app.delete('/api/apply', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
}