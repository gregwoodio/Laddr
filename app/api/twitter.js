// twitter.js

module.exports = function(app, passport) {

  app.get('/api/twitter', passport.authenticate('twitter'));

  app.get('/api/twitter/callback', function(req, res, next) {
    passport.authenticate('twitter', function(err, profile, data) {

      if (err) {
        console.log('twitter.js - ' + err.message);
        return next(err);
      }

      if (!profile) {
        console.log('twitter.js - no such profile.');
        return res.status(403).json(data);
      }

      req.login(profile, function(err) {

        if (err) {
          return next(err);
        }

        delete profile.dataValues.Password;

        console.log('twitter.js - profile: ');
        console.log(profile);

        var token = jwt.sign(profile.dataValues, app.get('secret'), {
          expiresIn: '1440m'
        });

        res.status(200).json({
          success: true,
          message: 'Enjoy your twitter token!',
          token: token,
          type: profile.AccountType
        });

      });
    })(req, res, next);
  });
}