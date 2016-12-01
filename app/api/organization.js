// organization.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var mw = require('../middleware');

module.exports = function(app, models) {

  // TODO: isAuthenticated middleware
  // GET organization
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
        res.json(org);
      }
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: 'Invalid profile ID.'
      });
    });
});

  // Get specific organiztion, public
  app.get('/api/organization/:id', [mw.verifyToken], function(req, res) {

    models.Profile.find({
      where: {
        ProfileID: req.params.id
      },
      include: [{
        model: models.Organization
      }],
      attributes: ['ProfileID', 'Email', 'PictureURL', 'Timestamp', 'AccountType', 'Archived']
    })
    .then(function(org) {

      delete org.dataValues.Password;

      if (!org) {
        res.status(400).json({
          success: false,
          message: 'No such user.'
        });
      } else {
        res.json(org);
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

    if (req.body.Email == undefined || req.body.Picture == undefined || req.body.Password == undefined || 
      req.body.OrganizationName == undefined || req.body.URL == undefined || req.body.MissionStatement == undefined || 
      req.body.AddressLine1 == undefined || req.body.City == undefined ||
      req.body.Province == undefined || req.body.Postal == undefined) {

      res.status(400).json({
        success: false,
        message: 'Missing parameters for organization creation.'
      });
    } else {

      bcrypt.hash(req.body.Password, 10, function(err, hash) {
        
        var profileID = uuid.v1();

        models.Profile.build({
          ProfileID: profileID,
          Email: req.body.Email,
          PictureURL: 'img/uploads/generic.jpg',
          Password: hash,
          Timestamp: new Date(),
          AccountType: 1,
          Archived: false
        })
        .save()
        .then(function(profile) {
          models.Organization.build({
            ProfileID: profileID,
            OrganizationName: req.body.OrganizationName,
            AddressLine1: req.body.AddressLine1,
            AddressLine2: req.body.AddressLine2 || '',
            City: req.body.City,
            Province: req.body.Province,
            Postal: req.body.Postal,
            Lat: req.body.Lat || 43.653956, //Davis campus ;)
            Lng: req.body.Lng || -79.739938999,
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

  app.put('/api/organization', mw.verifyToken, function(req, res) {

    // Alter only the information for current organization
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
      org = {};

      for (key in profile.dataValues) {
        org[key] = profile.dataValues[key];
      }

      for (key in profile.dataValues.LdrOrganization) {
        org[key] = profile.dataValues.LdrOrganization[key];
      }

      //now change the values to the new values
      models.Profile.update({
        ProfileID: org.ProfileID,
        Email: req.body.Email || org.Email,
        PictureURL: req.body.PictureURL || org.PictureURL
      }, {
        where: {
          ProfileID: req.decoded.ProfileID
        }
      })
      .then(function(profile) {
        models.Organization.update({
            OrganizationName: req.body.OrganizationName || org.OrganizationName,
            AddressLine1: req.body.AddressLine1 || org.AddressLine1,
            AddressLine2: req.body.AddressLine2 || org.AddressLine2,
            City: req.body.City || org.City,
            Province: req.body.Province || org.Province,
            Postal: req.body.Postal || org.Postal,
            Lat: req.body.Lat || org.Lat,
            Lng: req.body.Lng || org.Lng,
            URL: req.body.URL || org.URL,
            MissionStatement: req.body.MissionStatement || org.MissionStatement
          }, {
            where: {
              ProfileID: org.ProfileID
            } 
          })
          .then(function(org) {
            res.json({
              success: true,
              message: 'Account updated.',
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

  app.delete('/api/organization', mw.verifyToken, function(req, res) {

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

        // delete Topics, Comments and Postings created by that user as well.
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

        models.Posting.update({
            Archived: true
          }, {
            where: {
              ProfileID: req.decoded.ProfileID
            }
          })
          .then(function(postings) {

          });

        res.status(200).json({
          success: true,
          message: 'Account deleted. Sorry to see you go!',
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: 'Encountered error deleting account: ' + err.message
        });
      });

  });
};
