// organization.js

var uuid = require('uuid');

module.exports = function(app, connection) {

    // Get organization 
    app.get('/api/organization', function(req, res) {

        var profileID = req.query.id;

        console.log("Organization profile ID: " + profileID);
        if (profileID != undefined) {

            connection.query('SELECT * FROM LdrOrganizations o INNER JOIN LdrProfiles p ON o.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [profileID], function(err, rows, fields) {
                if (err) throw err;

                res.json(rows);
            });
        } else {
            res.json([]);
        }
    });
    
    // Add organization
    app.post('/api/organization', function(req, res) {
        
        var new_profile = {
            ProfileID: uuid.v1(),
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password, //TODO:bcrypt this
            PictureURL: req.body.Picture,
            //Timestamp: 'NOW()' //TODO: Fix this
            AccountType: 1
        };

        connection.query('INSERT INTO LdrProfiles (ProfileID, Username, Email, Password, PictureURL, Timestamp, AccountType) VALUES (?, ?, ?, ?, ?, NOW(), ?)', [new_profile.ProfileID, new_profile.Username, new_profile.Email, new_profile.Password, new_profile.PictureURL, new_profile.AccountType], function(err, result) {
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
                res.json('true');
            });
        });
    });
};
