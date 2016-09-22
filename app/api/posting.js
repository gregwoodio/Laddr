// posting.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var mw = require('../middleware');

module.exports = function(app, models) {

  //get one posting by id
  app.get('/api/posting/:id', [mw.verifyToken], function(req, res) {
    
    models.Posting.find({
        where: {
          PostingID: req.params.id
        }
      })
      .then(function(posting) {
        res.json(posting);
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

  });

  // Get postings
  app.get('/api/posting', [mw.verifyToken], function(req, res) {
      
    models.Posting.findAll()
      .then(function(postings) {
        
        res.json(postings);
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      });

  });

  // Add a posting
  app.post('/api/posting', [mw.verifyToken], function(req, res) {

    if (req.body.ProfileID == undefined || req.body.JobTitle == undefined || req.body.Location == undefined ||
      req.body.Description == undefined || req.body.ProfileID == '' || req.body.JobTitle == '' ||
      req.body.Location == '' || req.body.Description == '') {
      res.status(400).json({
        success: false,
        message: 'Missing parameters for user creation.'
      });
    } else {

      models.Posting.build({
          PostingID: uuid.v1(),
          ProfileID: req.body.ProfileID,
          JobTitle: req.body.JobTitle,
          Location: req.body.Location,
          Description: req.body.Description
        })
        .save()
        .then(function(posting) {
          res.json({
            success: true,
            message: 'Posting added.'
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

  app.put('/api/posting', function(req, res) {

    var token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // Alter the posting only if the current ProfileID is also the poster
          if (decoded.ProfileID == req.body.ProfileID) {

            models.Posting.update({
                JobTitle: req.body.JobTitle,
                Location: req.body.Location,
                Description: req.body.Description
              }, {
                where: {
                  PostingID: req.body.PostingID    
                }
              })
              .then(function(posting) {
                res.json({
                  success: true,
                  message: 'Posting updated.'
                });
              })
              .catch(function(err) {
                res.status(500).json({
                  success: false,
                  message: err.message
                });
              });
          } else {
            res.status(500).json({
              success: false,
              message: 'Cannot edit posting created by another user.'
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
};
