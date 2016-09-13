// posting.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

  // Get postings
  app.get('/api/posting', function(req, res) {
      
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          //if PostingID is specified, get that posting
          var postingID = req.query.id;
          
          if (postingID != undefined) {
            connection.query('SELECT p.PostingID, p.JobTitle, p.Location, p.Description, p.Timestamp, o.OrganizationName, o.Address, ' +
              'o.MissionStatement, op.PictureURL FROM LdrPostings p INNER JOIN LdrOrganizations o ON p.ProfileID = o.ProfileID ' +
              'INNER JOIN LdrProfiles op ON o.ProfileID = op.ProfileID WHERE PostingID = ?', [postingID], function(err, rows) {

              if (err) throw err;

              res.json(rows[0]);
            });
          } else {
              
            //PostingID not specified, get most recent postings
            //TODO: Pagination. We're going to have a lot of postings here, so add something to 
            //split up the queries into manageable chunks.
            connection.query('SELECT p.PostingID, p.JobTitle, p.Location, p.Description, p.Timestamp, p.ProfileID, o.OrganizationName ' +
              'FROM LdrPostings p JOIN LdrOrganizations o WHERE p.ProfileID = o.ProfileID ORDER BY p.Timestamp DESC', function(err, rows) {
              if (err) throw err;

              res.json(rows);
            });
          }
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No token provided."
      });
    }
      
  });

  // Add a posting
  app.post('/api/posting', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {

          var posting = {
            PostingID: uuid.v1(),
            ProfileID: req.body.ProfileID,
            JobTitle: req.body.JobTitle,
            Location: req.body.Location,
            Description: req.body.Description
          };

          connection.query('INSERT INTO LdrPostings (PostingID, ProfileID, JobTitle, Location, Description, Timestamp) VALUES ' +
            '(?, ?, ?, ?, ?, NOW())', [posting.PostingID, posting.ProfileID, posting.JobTitle, posting.Location, posting.Location], 
            function(err, rows) {
            if (err) throw err;
            
            console.log('Posting added = ' + posting.JobTitle);
            res.json({
              success: true,
              message: "Posting added."
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

  app.put('/api/posting', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          // Alter the posting only if the current ProfileID is also the poster
          if (decoded.ProfileID == req.body.ProfileID) {
            updatedProfile = {
              PostingID: req.body.PostingID, //note this shouldn't change, but should be included in the request
              JobTitle: req.body.JobTitle,
              Location: req.body.Location,
              Description: req.body.Description
            }

            connection.query('UPDATE LdrPostings SET JobTitle = ?, Location = ?, Description = ? WHERE PostingID = ?', 
              [updatedProfile.JobTitle, updatedProfile.Location, updatedProfile.Description, updatedProfile.PostingID], 
              function(err, results) {

              if (err) throw err;

              res.json({
                success: true,
                message: 'Posting updated.'
              });
            });
          }
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
