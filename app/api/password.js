// password.js

jwt = require('jsonwebtoken');
bcrypt = require('bcrypt');

module.exports = function(app, models) {

  //change the user's password
  app.post('/api/changepassword', function(req, res, next) {

    var token = req.headers['x-access-token'];

    if (req.body.OldPass == undefined || req.body.NewPass == undefined) {
      console.log('password.js - Missing form data.');
      res.status(400).json({
        success: false,
        message: 'Missing form data.'
      });
    } else {

      if (token) {
        jwt.verify(token, app.get('secret'), function(err, decoded) {
          if (err) {
            console.log('topic.js - failed to authenticate token.');
            res.status(403).json({
              success: false,
              message: 'Failed to authenticate token.'
            });
          } else {

            models.Profile.find({
              where: {
                Email: decoded.Email,
                Archived: false
              }}).then(function(profile) {
                //verify old password
                if (!bcrypt.compareSync(req.body.OldPass, profile.dataValues.Password)) {
                  res.status(403).json({
                    success: false,
                    message: 'Bad password.'
                  });
                } else {

                  //change to new password
                  bcrypt.hash(req.body.NewPass, 10, function(err, hash) {

                    models.Profile.update({
                        Password: hash
                      }, {
                        where: {
                          ProfileID: decoded.ProfileID
                        }
                      })
                      .then(function(password) {
                        res.json({
                          success: true,
                          message: 'Password changed.'
                        });
                      })
                      .catch(function(err) {
                        res.status(500).json({
                          success: false,
                          message: 'Encountered error: ' + err.message
                        });
                      });
                  });
                }
              }); 
          }
        });
      } else {
        console.log('topic.js - No token provided.');
        res.status(403).json({
          success: false,
          message: "No token provided."
        });
      }      
    }
  });

  app.get('/api/changepassword', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/changepassword', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/changepassword', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
};