// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var models = require('../app/models');
var bcrypt = require('bcrypt');

module.exports = function(passport) {

  // serialization methods
  passport.serializeUser(function(profile, done) {
    done(null, profile.ProfileID);
  });

  passport.deserializeUser(function(id, done) {
    models.Profile.find({
      where: {ProfileID: id}
    }).then(function(profile) {
      done(null, profile.toJSON());
    })
    .catch(function(err) {
      done(err, null);
    });
  });

  // local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
  },
  function(req, username, password, done) {

    // find the requested profile
    models.Profile.find({
      where: {
        Username: username
      }}).then(function(profile) {

        // no profile found
        if (!profile) {
          console.log('passport.js - No such profile.');
          return done(null, false, {
            success: false,
            message: 'Invalid login.'
          });
        }

        // incorrect password
        if (!bcrypt.compareSync(password, profile.dataValues.Password)) {
          console.log('passport.js - Bad password.');
          return done(null, false, {
            success: false,
            message: 'Incorrect password.'
          });
        }

        // check if profile is User or Organization

        prof = {};
        delete profile.dataValues.Password;
        
        for (key in profile.dataValues) {
          prof[key] = profile.dataValues[key];
        }

        if (profile.dataValues.AccountType == 0) {

          models.User.find({
            where: {
              ProfileID: profile.dataValues.ProfileID
            }
          })
          .then(function(user) {

            //add in user values
            for (key in user.dataValues) {
              prof[key] = user.dataValues[key];
            }
            console.log(prof);
            return done(null, prof, {
              success: true,
              message: 'Profile sent.'
            });

          })
          .catch(function(err) {
            return done(err, false, {
              success: false,
              message: 'Error finding account.'
            })
          })

        } else if (profile.dataValues.AccountType == 1) {
          //organization
          models.Organization.find({
            where: {
              ProfileID: profile.dataValues.ProfileID
            }
          })
          .then(function(org) {

            //add in organization values
            for (key in org.dataValues) {
              prof[key] = org.dataValues[key];
            }
            console.log(prof);
            return done(null, prof, {
              success: true,
              message: 'Profile sent.'
            });
          })
          .catch(function(err) {
            return done(err, false, {
              success: false,
              message: 'Error finding account.'
            });
          });

        } else {

          //shouldn't end up here
          return done(null, false, {
            success: false,
            message: 'Bad profile type.'
          });
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));

}