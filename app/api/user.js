// user.js

uuid = require('uuid');
bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
mw = require('../middleware');

module.exports = function(app, models) {

  //TODO: isAuthenticated middleware
  // Get user
  app.get('/api/user/:id', [mw.verifyToken], function(req, res) {

    models.User.find({
      where: {
        ProfileID: req.params.id
      }
    })
    .then(function(user) {
      if (!user) {
        res.status(400).json({
          success: false,
          message: 'No such user.'
        });
      } else {
        console.log(user.dataValues);
        res.json(user.dataValues);
      }
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: 'Invalid profile ID.'
      });
    });

  });

  // Add user
  app.post('/api/user', function(req, res) {
    
    //TODO: Validate info first

    //make sure all the required info was provided
    if (req.body.Email == undefined || req.body.Password == undefined || req.body.AcademicStatus == undefined ||
      req.body.Picture == undefined || req.body.FirstName == undefined || req.body.LastName == undefined ||
      req.body.Description == undefined || req.body.Resume == undefined) {

      res.status(400).json({
        success: false,
        message: 'Missing parameters for user creation.'
      });
    } else {

      bcrypt.hash(req.body.Password, 10, function(err, hash) {

        var profileID = uuid.v1();

        models.Profile.build({
          ProfileID: profileID,
          Email: req.body.Email,
          PictureURL: req.body.Picture,
          Password: hash,
          Timestamp: new Date(),
          AccountType: 0,
          Archived: false
        })
        .save()
        .then(function(profile) {
          models.User.build({
            ProfileID: profileID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Description: req.body.Description,
            Resume: req.body.Resume,
            AcademicStatus: req.body.AcademicStatus
          })
          .save()
          .then(function(user) {
            res.json({
              success: true,
              message: 'New user added.',
              id: profileID
            });
          })
          .catch(function(err) {
            res.status(500).json({
              success: false,
              message: err.message
            });
          })
        })
        .catch(function(err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        });
      });
    }
  });

  //modify user and profile
  app.put('/api/user', function(req, res) {

    var token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // Alter only the information for current user
          // ProfileID cannot change
          // Passwords will be changed elsewhere.

          models.Profile.update({
              Email: req.body.Email || decoded.Email,
              PictureURL: req.body.PictureURL || decoded.PictureURL
            }, {
              where: {
                ProfileID: decoded.ProfileID
              }
            })
            .then(function(profile) {
              models.User.update({
                  Firstname: req.body.FirstName || decoded.FirstName,
                  LastName: req.body.LastName || decoded.LastName,
                  Description: req.body.Description || decoded.Description,
                  Resume: req.body.Resume || decoded.Resume,
                  AcademicStatus: req.body.AcademicStatus || decoded.AcademicStatus || 0 //TODO: fix this
                }, {
                  where: {
                    ProfileID: decoded.ProfileID
                  }
                })
                .then(function(user) {
                  res.json({
                    success: true,
                    message: 'Account updated.',
                    token: token
                  });
                })
                .catch(function(err) {
                  res.status(500).json({
                    success: false,
                    message: err.message
                  });
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

  app.delete('/api/user', function(req, res) {
    
    var token = req.headers['x-access-token'];

    if (token) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {

          // only delete accounts that are verified by a token. 
          // Accounts are not deleted from the database, but are marked as archived.

          models.Profile.update({
              Archived: true
            }, {
              where: {
                ProfileID: decoded.ProfileID
              }
            })
            .then(function(profile) {

              // delete Topics and Comments created by that user as well.
              models.Comment.update({
                  Archived: true
                }, {
                  where: {
                    ProfileID: decoded.ProfileID
                  }
                })
                .then(function(comments) {

                });

              models.Topic.update({
                  Archived: true
                }, {
                  where: {
                    ProfileID: decoded.ProfileID
                  }
                })
                .then(function(topics) {

                });

              res.status(200).json({
                success: true,
                message: 'Account deleted. Sorry to see you go!',
              });
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: 'Encountered error deleting user: ' + err.message
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
};
