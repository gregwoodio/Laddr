// organization.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = function(app, connection) {

  // Get organization 
  app.get('/api/organization', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token && req.query.ProfileID) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          //what info to expose here? is this public or private?
          connection.query('SELECT p.PictureURL, o.OrganizationName, o.Address, o.URL, o.MissionStatement FROM LdrOrganizations ' +
          	'o INNER JOIN LdrProfiles p ON o.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [req.query.ProfileID], 
          	function(err, rows, fields) {
            
            if (err) throw err;

            //don't return the hashed password
            profile = rows[0];

            res.json(profile);
          });
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No token provided."
      });
    }
  });
    
  // Add organization
  app.post('/api/organization', function(req, res) {

    bcrypt.hash(req.body.Password, 10, function(err, hash) {
      var new_profile = {
        ProfileID: uuid.v1(),
        Username: req.body.Username,
        Email: req.body.Email,
        PictureURL: req.body.Picture,
        Password: hash,
        //Timestamp: 'NOW()' //TODO: Fix this
        AccountType: 1
      };

      console.log(new_profile['Password']);

      connection.query('INSERT INTO LdrProfiles (ProfileID, Username, Email, Password, PictureURL, Timestamp, AccountType) ' +
      	'VALUES (?, ?, ?, ?, ?, NOW(), ?)', [new_profile.ProfileID, new_profile.Username, new_profile.Email, new_profile.Password, 
      	new_profile.PictureURL, new_profile.AccountType], function(err, result) {

        if (err) throw err;
        
        var new_organization = {
          ProfileID: new_profile.ProfileID,
          OrganizationName: req.body.OrganizationName,
          Address: req.body.Address,
          URL: req.body.URL,
          MissionStatement: req.body.MissionStatement
        }

        connection.query('INSERT INTO LdrOrganizations SET ?', [new_organization], function(err, result) {
          if (err) throw err;

          console.log('New organization added.');
          res.json({
            success: true,
            message: "Organization added."
          });
        });
      });
    });
  });

  app.put('/api/organization', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // Alter only the information for current organization
          // ProfileID and Username cannot change
          // Passwords will be changed elsewhere.
          updatedOrg = {
            ProfileID: decoded.ProfileID,
            Username: decoded.Username,
            Email: req.body.Email,
            PictureURL: req.body.PictureURL,
            OrganizationName: req.body.OrganizationName,
            Address: req.body.Address,
            URL: req.body.URL,
            MissionStatement: req.body.MissionStatement
          }

          connection.query('UPDATE LdrProfiles SET Username = ?, Email = ?, PictureURL = ? WHERE ProfileID = ?', 
            [updatedOrg.Username, updatedOrg.Email, updatedOrg.PictureURL, updatedOrg.ProfileID], function(err, results) {

            if (err) throw err;

            connection.query('UPDATE LdrOrganizations SET OrganizationName = ?, Address = ?, URL = ?, MissionStatement = ? ' +
              'WHERE ProfileID = ?', [updatedOrg.OrganizationName, updatedOrg.Address, updatedOrg.URL, updatedOrg.MissionStatement, 
              updatedOrg.ProfileID], function(err, results) {

              if (err) throw err;

              // get a new token, the old one will now have outdated information in it
              // TODO: Write a method in the login class that exchanges a valid token for a refreshed version of it

              res.json({
                success: true,
                message: 'Account updated.',
                token: token
              });
            });
          });
        }
      });
    } else {
        res.status(403).json({
            success: false,
            message: "No token provided."
        });
    }
  });
};
