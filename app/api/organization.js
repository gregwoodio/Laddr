// organization.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var mw = require('../middleware');

module.exports = function(app, models) {

  // TODO: isAuthenticated middleware
  // Get organization 
  app.get('/api/organization', [mw.verifyToken], function(req, res) {

    models.Organization.find({
      where: {
        ProfileID: req.query.ProfileID
      }
    })
    .then(function(org) {

      if (!org) {
        res.status(400).json({
          success: false,
          message: 'No such user.'
        });
      } else {
        console.log(org.attributes);
        res.json(org.attributes);
      }
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: 'Invalid profile ID.'
      });
    });
  });
    
  // Add organization
  app.post('/api/organization', function(req, res) {

    if (req.body.Username == undefined || req.body.Email == undefined || req.body.Picture == undefined || 
      req.body.Password == undefined || req.body.OrganizationName == undefined || req.body.URL == undefined ||
      req.body.MissionStatement == undefined || req.body.Address == undefined ||
      req.body.Username == '' || req.body.Email == '' || req.body.Picture == '' || 
      req.body.Password == '' || req.body.OrganizationName == '' || req.body.URL == '' ||
      req.body.MissionStatement == '' || req.body.Address == '') {

      res.status(400).json({
        success: false,
        message: 'Missing parameters for organization creation.'
      });
    } else {

      bcrypt.hash(req.body.Password, 10, function(err, hash) {
        
        var profileID = uuid.v1();

        models.Profile.build({
          ProfileID: profileID,
          Username: req.body.Username,
          Email: req.body.Email,
          PictureURL: req.body.Picture,
          Password: hash,
          Timestamp: new Date(),
          AccountType: 1
        })
        .save()
        .then(function(profile) {
          models.Organization.build({
            ProfileID: profileID,
            OrganizationName: req.body.OrganizationName,
            Address: req.body.Address,
            URL: req.body.URL,
            MissionStatement: req.body.MissionStatement
          })
          .save()
          .then(function(org) {
            res.json({
              success: true,
              message: 'New organization added.',
              id: profileID
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
    }
  });

  app.put('/api/organization', function(req, res) {

    var token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // Alter only the information for current organization
          // ProfileID and Username cannot change
          // Passwords will be changed elsewhere.

          models.Profile.update({
              ProfileID: decoded.ProfileID,
              Username: decoded.Username,
              Email: req.body.Email || decoded.Email,
              PictureURL: req.body.PictureURL || decoded.PictureURL
            }, {
              where: {
                ProfileID: decoded.ProfileID
              }
            })
            .then(function(profile) {
              models.Organization.update({
                  OrganizationName: req.body.OrganizationName || decoded.OrganizationName,
                  Address: req.body.Address || decoded.Address,
                  URL: req.body.URL || decoded.URL,
                  MissionStatement: req.body.MissionStatement || decoded.MissionStatement
                }, {
                  where: {
                    ProfileID: decoded.ProfileID
                  } 
                })
                .then(function(org) {
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
            message: "No token provided."
        });
    }
  });
};
