// posting.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var mw = require('../middleware');

module.exports = function(app, models) {

  //get one posting by id
  app.get('/api/posting/:id', [mw.verifyToken], function(req, res) {
    
    models.Posting.find({
        where: {
          PostingID: req.params.id,
          Archived: false
        },
        include: [{
          model: models.Profile,
          include: [{
            model: models.Organization
          }]
        }, {
          model: models.PostingTag,
          include: [{
            model: models.Tag
          }]
        }]
      })
      .then(function(posting) {
        posting.LdrProfile.Password = undefined;
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
      
    models.Posting.findAll({
        where: {
          Archived: false
        },
        include: [{
          model: models.Profile,
          include: [{
            model: models.Organization
          }]
        }, {
          model: models.PostingTag,
          include: [{
            model: models.Tag
          }]
        }],
        order: [
          ['Timestamp', 'DESC']
        ]
      })
      .then(function(postings) {
        for (i = 0; i < postings.length; i++) {
          postings[i].LdrProfile.Password = undefined;
        }
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
      req.body.Description == undefined || req.body.Lat == undefined || req.body.Lng == undefined || 
      req.body.ProfileID == '' || req.body.JobTitle == '' || req.body.Location == '' || req.body.Description == '') {
      res.status(400).json({
        success: false,
        message: 'Missing parameters for posting creation.'
      });
    } else {

      models.Posting.build({
          PostingID: uuid.v1(),
          ProfileID: req.body.ProfileID,
          JobTitle: req.body.JobTitle,
          Location: req.body.Location,
          Lat: req.body.Lat || 43.653956, //Davis campus ;)
          Lng: req.body.Lng || -79.739938999,
          Description: req.body.Description
        })
        .save()
        .then(function(posting) {

          console.log(req.body.Tags);

          //add tags
          for (i = 0; i < req.body.Tags.length; i++) {
            if (req.body.Tags[i] == true) {
              models.PostingTag.build({
                PostingID: posting.PostingID,
                TagID: i
              })
              .save()
              .then(function(tag) {
                console.log(tag + ' added to ' + posting.JobTitle);
              })
              .catch(function(err) {
                console.log('Didn\'t add ' + tag + ' to ' + posting.JobTitle);
                console.log(err.message);
              });
            }
          }

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
                  PostingID: req.body.PostingID,
                  ProfileID: decoded.ProfileID,
                  Archived: false
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

            //tags are dodgy, this could probably be improved
            //remove existing tags first

            models.PostingTag.destroy({
              where: {
                PostingID: req.body.PostingID
              }
            });

            // add new tags
            for (i = 0; i < req.body.Tags.length; i++) {
              if (req.body.Tags[i].Enabled == true) {
                models.PostingTag.build({
                  PostingID: req.body.PostingID,
                  TagID: req.body.Tags[i].TagID
                })
                .save()
                .then(function(tag) {
                  console.log(tag + ' added to ' + posting.JobTitle);
                })
                .catch(function(err) {
                  console.log('Didn\'t add ' + tag + ' to ' + posting.JobTitle);
                  console.log(err.message);
                });
              }
            }
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

  app.delete('/api/posting/:id', function(req, res) {
    var token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {

          models.Posting.update({
              Archived: true
            }, {
              where: {
                PostingID: req.params.id,
                ProfileID: decoded.ProfileID
              }
            })
            .then(function(posting) {

              console.log('test/posting.js - ' + posting);

              res.json({
                success: true,
                message: 'Posting deleted.'
              });
            })
            .catch(function(err) {

              console.log('test/posting.js - ' + err.message);

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
        message: "No token provided."
      });
    }
  });
};
