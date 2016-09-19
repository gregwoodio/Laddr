// user.js

uuid = require('uuid');
bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');

module.exports = function(app, models) {

  // Get user
  app.get('/api/user', isLoggedIn, function(req, res) {

    var token = req.headers['x-access-token'];

    // if (token && req.query.ProfileID) {
      // jwt.verify(token, app.get('secret'), function(err, decoded) {
      //   if (err) {
      //     res.json({
      //       success: false,
      //       message: 'Failed to authenticate token.'
      //     });
      //   } else {
          //What info to expose here?
          //Is this for the public profile, or personal profile?
          // connection.query('SELECT p.PictureURL, u.FirstName, u.LastName, u.Description FROM LdrUsers u INNER JOIN LdrProfiles p ' + 
          //   'ON u.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [req.query.ProfileID], function(err, rows, fields) {

          //   if (err) throw err;

          //   //don't return the hashed password
          //   profile = rows[0];

          //   res.json(profile);
          // });

          // console.log(models);

          models.User.forge({ProfileID: req.query.ProfileID})
            .fetch()
            .then(function(user) {
              if (!user) {
                res.status(400).json({
                  success: false,
                  message: 'No such user.'
                });
              } else {
                res.json(user.toJSON());
              }
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            });
        // }
      // });
    // } else {
    //   res.status(403).json({
    //     success: false,
    //     message: 'No token provided.'
    //   });
    // }
  });

  // Add user
  app.post('/api/user', function(req, res) {
    
    //TODO: Validate info first

    //make sure all the required info was provided
    if (req.body.Username == undefined || req.body.Email == undefined || 
      req.body.Picture == undefined || req.body.FirstName == undefined ||
      req.body.LastName == undefined || req.body.Description == undefined ||
      req.body.Resume == undefined) {

      res.status(400).json({
        success: false,
        message: 'Missing parameters for user creation.'
      });
    } else {

      bcrypt.hash(req.body.Password, 10, function(err, hash) {

        var profileID = uuid.v1();

        models.Profile.forge({
          ProfileID: profileID,
          Username: req.body.Username,
          Email: req.body.Email,
          PictureURL: req.body.Picture,
          Password: hash,
          //Timestamp: NOW(), //TODO: also needs to be fixed somehow
          AccountType: 0
        })
        .save()
        .then(function(profile) {
          models.User.forge({
            ProfileID: profileID,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Description: req.body.Description,
            Resume: req.body.Resume,
            AcademicStatus: 1 
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
              message: 'Error while entering new user.'
            });
          })
        })
        .catch(function(err) {
          res.status(500).json({
            success: false,
            message: 'Error while entering new user.'
          });
        });
      });
    }
  });

  //modify user and profile
  app.put('/api/user', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // Alter only the information for current user
          // ProfileID and Username cannot change
          // Passwords will be changed elsewhere.

          models.Profile.forge({ProfileID: decoded.ProfileID})
            .fetch({require: true})
            .then(function(profile) {
              profile.save({
                ProfileID: decoded.ProfileID,
                Username: decoded.Username,
                Email: req.body.Email,
                PictureURL: req.body.PictureURL
              })
              .then(function() {
                models.User.forge({
                  ProfileID: decoded.ProfileID
                })
                .fetch({require: true})
                .then(function(user) {
                  user.save({
                    Firstname: req.body.FirstName,
                    LastName: req.body.LastName,
                    Description: req.body.Description,
                    Resume: req.body.Resume,
                    AcademicStatus: req.body.AcademicStatus
                  })
                  .then(function() {
                    res.json({
                      success: true,
                      message: 'Account updated.',
                      token: token
                    });
                  });
              });
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}