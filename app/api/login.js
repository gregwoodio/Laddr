// login.js

jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

	//logs into our system, returns a token
  app.post('/api/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, profile, data) {

      if (err) {
        console.log('login.js - ' + err.message);
        return next(err);
      }

      if (!profile) {
        console.log('login.js - No such user.');
        return res.status(403).json({
          success: false,
          message: 'Invalid email or password.',
          data: data
        });
      }

      req.login(profile, function(err) {

        if (err)
          return next(err);

        delete profile.Password;

        console.log('login.js - profile: ');
        console.log(profile);

        var token = jwt.sign(profile, app.get('secret'), {
          expiresIn: '1440m'
        });

        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          profile: profile,
          token: token,
        });

      });
    })(req, res, next);
  });

  app.get('/api/login', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/login', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/login', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
};