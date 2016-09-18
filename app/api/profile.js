// profile.js

jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

	//logs into our system, returns a token
	app.get('/api/profile', function(req, res) {

	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
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