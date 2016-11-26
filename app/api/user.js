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

  app.post('/api/user/:fdi', mw.verifyToken, function(req, res) {

    models.User.update({
      Fdi: req.params.fdi
    }, {
      where: {
        ProfileID: req.decoded.ProfileID
      }
    })
    .then(function(user) {
      res.json({
        success: true,
        message: 'FDI added.'
      });
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });

  });

  //modify user and profile
  app.put('/api/user', mw.verifyToken, function(req, res) {

    // Alter only the information for current user
    // ProfileID cannot change
    // Passwords will be changed elsewhere.

    //get the existing profile first
    models.Profile.find({
      where: {
        ProfileID: req.decoded.ProfileID
      }, 
      include: [models.Organization]
    })
    .then(function(profile) {
      user = {};

      for (key in profile.dataValues) {
        user[key] = profile.dataValues[key];
      }

      for (key in profile.dataValues.LdrOrganization) {
        user[key] = profile.dataValues.LdrOrganization[key];
      }

      //now change the values to the new values
      models.Profile.update({
          Email: req.body.Email || user.Email,
          PictureURL: req.body.PictureURL || user.PictureURL
        }, {
          where: {
            ProfileID: req.decoded.ProfileID
          }
        })
        .then(function(profile) {
          models.User.update({
              Firstname: req.body.FirstName || user.FirstName,
              LastName: req.body.LastName || user.LastName,
              Description: req.body.Description || user.Description,
              Resume: req.body.Resume || user.Resume,
              AcademicStatus: req.body.AcademicStatus || user.AcademicStatus || 0 //TODO: fix this
            }, {
              where: {
                ProfileID: user.ProfileID
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
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

  });

  app.delete('/api/user', mw.verifyToken, function(req, res) {
    
    // only delete accounts that are verified by a token. 
    // Accounts are not deleted from the database, but are marked as archived.

    models.Profile.update({
        Archived: true
      }, {
        where: {
          ProfileID: req.decoded.ProfileID
        }
      })
      .then(function(profile) {

        // delete Topics and Comments created by that user as well.
        models.Comment.update({
            Archived: true
          }, {
            where: {
              ProfileID: req.decoded.ProfileID
            }
          })
          .then(function(comments) {

          });

        models.Topic.update({
            Archived: true
          }, {
            where: {
              ProfileID: req.decoded.ProfileID
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

  });
};
