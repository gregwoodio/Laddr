// organization.js

module.exports = function(app, connection) {

    // Get organization 
    app.get('/api/organization', function(req, res) {

        var profileID = req.query.ProfileID;

        console.log("Organization profile ID: " + profileID);
        if (profileID != undefined) {

            connection.query('SELECT * FROM LdrOrganizations o INNER JOIN LdrProfiles p ON o.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [profileID], function(err, rows, fields) {
                if (err) throw err;

                res.json(rows);
            });
        }
    });
    
    // Add organization
    app.post('/api/organization', function(req, res) {
        
        var new_profile = {
            ProfileID: null,
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password, //TODO:bcrypt this
            PictureURL: req.body.Picture,
            //Timestamp: 'NOW()' //TODO: Fix this
            AccountType: 1
        };

        connection.query('INSERT INTO LdrProfiles SET ?', [new_profile], function(err, result) {
            if (err) throw err;
            
            var new_organization = {
                ProfileID: result.insertId,
                OrganizationName: req.body.OrgName,
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
