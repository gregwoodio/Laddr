// login.js

jwt = require('jsonwebtoken');

module.exports = function(app, models) {

  // app.post('/api/login', passport.authenticate('local-login', function(err, username, password, done) {
  //   req.logIn(profile, function() {
  //     res.status(err ? 500 : 200).send(err ? err : profile);
  //   });  
  // })(this.req, this.res, this.done));

	//logs into our system, returns a token
  app.post('/api/login', function(req, res) {

    if (req.body.Username == undefined || req.body.Password == undefined) {
      res.status(403).json({
        success: false,
        message: "No credentials provided."
      });
      return;
    }

    models.Profile.forge({Username: req.body.Username, Password: req.body.Password})
      .fetch()
      .then(function(profile) {
        console.log('Profile: ' + profile.attributes);
        return res.json(profile.attributes);
      })
      .catch(function(err) {
        return res.json({
          success: false,
          message: 'Encountered an error logging in.'
        });
      });

  //   connection.query("SELECT * FROM LdrProfiles WHERE Username = ?", [req.body.Username], function(err, rows) {
  //     if (err) {
  //       throw err;
  //     }
  //     if (!rows.length) {
  //       //username doesn't exist
  //       res.status(403).json({
  //         success: false,
  //         message: "Authentication failed, user not found."
  //       });
  //     } else if (!bcrypt.compareSync(req.body.Password, rows[0].Password)) {
  //       res.status(403).json({
  //         success: false,
  //         message: "Authentication failed, incorrect password."
  //       });
  //     } else {

  //       var profile = rows[0];
  //       profile["Password"] = null;

  //       if (profile.AccountType == 0) {
  //         //user
  //         connection.query("SELECT * FROM LdrUsers WHERE ProfileID = ?", [profile.ProfileID], function(err, rows) {
  //           if (err) {
  //             throw err;
  //           }

  //           user = rows[0];
  //           for (var key in user) {
  //             profile[key] = user[key];
  //           }

  //           var token = jwt.sign(profile, app.get('secret'), {
  //             expiresIn: '1440m'
  //           });

  //           res.status(200).json({
  //             success: true,
  //             message: 'Enjoy your token!',
  //             token: token,
  //             type: 0
  //           });

  //         });

                

  //       } else if (profile.AccountType == 1) {
  //         //organization
  //         connection.query("SELECT * FROM LdrOrganizations WHERE ProfileID = ?", [profile.ProfileID], function(err, rows) {
  //           if (err) {
  //             throw err;
  //           }

  //           org = rows[0];
            
  //           for (var key in org) {
  //             profile[key] = org[key];
  //           }

  //           var token = jwt.sign(profile, app.get('secret'), {
  //             expiresIn: '1440m'
  //           });

  //           res.status(200).json({
  //             success: true,
  //             message: 'Enjoy your token!',
  //             token: token,
  //             type: 1
  //           });

  //         });              
  //       }
  //     }
  //   });
  });

  app.get('/api/login', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.put('/api/login', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/login', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
};