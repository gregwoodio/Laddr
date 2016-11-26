// password.js

mw = require('../middleware');
bcrypt = require('bcrypt');

module.exports = function(app, models) {

  //change the user's password
  app.post('/api/changepassword', mw.verifyToken, function(req, res, next) {

    if (req.body.OldPass == undefined || req.body.NewPass == undefined) {
      console.log('password.js - Missing form data.');
      res.status(400).json({
        success: false,
        message: 'Missing form data.'
      });
    } else {

      models.Profile.find({
        where: {
          Email: req.decoded.Email,
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
                    ProfileID: req.decoded.ProfileID
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