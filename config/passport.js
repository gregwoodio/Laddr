// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var models = require('../app/models');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    models.Profile.forge({ProfileID: id})
    .fetch()
    .then(function(profile) {
      done(profile);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password',
    passReqToCallback: true
  },
  function(req, username, password, done) {

    models.Profile.forge({Username: username})
      .fetch()
      .then(function(profile) {

        if (!profile) {
          return done(null, false);
        }

        if (!bcrypt.compareSync(password, profile.attributes.Password)) {
          return done(null, false);
        }

        req.logIn(profile, function(err) {
          if (err)
            console.log(err.message);

          req.session.profile = profile.attributes;

        });

        return done(null, profile);

      })
      .catch(function(err) {
        console.log(err.message);
      });
  }));

}