// profile.js

jwt = require('jsonwebtoken');

module.exports = function(app, passport) {

	//logs into our system, returns a token
	app.get('/api/profile', function(req, res) {

    token = req.headers['x-access-token'];

    if (token) {

      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          console.log('profile.js - decoded: ' + decoded);
          res.json(decoded);
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No token provided."
      });

    }
  
  });

  app.post('/api/profile', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/profile', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/profile', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
};

// route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, carry on 
//   if (req.isAuthenticated())
//     return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }


// function verifyToken(req, res, next) {

//   // token = req.headers['x-access-token'];

//   // if (token) {

//   //   jwt.verify(token, app.get('secret'), function(err, decoded) {
//   //     if (err) {
//   //       res.json({
//   //         success: false,
//   //         message: "Failed to authenticate token."
//   //       });
//   //     } else {
//   //       req.decoded = decoded;
//   //       next();
//   //     }
//   //   });
//   // } else {
//   //   res.status(403).json({
//   //     success: false,
//   //     message: "No token provided."
//   //   });

//   // }
// }