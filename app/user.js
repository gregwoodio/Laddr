// user.js

uuid = require('uuid');

module.exports = function(app, connection) {

    // Get user
    app.get('/api/user', function(req, res) {

        var profileID = req.query.id;

        console.log("User profile ID: " + profileID);
        if (profileID != undefined) {

            connection.query('SELECT * FROM LdrUsers u INNER JOIN LdrProfiles p ON u.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [profileID], function(err, rows, fields) {
                if (err) throw err;

                res.json(rows);
            });
        } else {
            res.json([]);
        }
    });

    // Add user
    app.post('/api/user', function(req, res) {
        
        //TODO: Validate info first

        var new_profile = {
            ProfileID: uuid.v1(),
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password, //TODO: bcrypt this
            PictureURL: req.body.Picture,
            //Timestamp: NOW(), //TODO: also needs to be fixed somehow
            AccountType: 0
        };

        console.log(new_profile.PictureURL);

        connection.query('INSERT INTO LdrProfiles (ProfileID, Username, Email, Password, PictureURL, Timestamp, AccountType) VALUES (?, ?, ?, ?, ?, NOW(), ?)', [new_profile.ProfileID, new_profile.Username, new_profile.Email, new_profile.Password, new_profile.PictureURL, new_profile.AccountType], function(err, result) {
            if (err) throw err;
            
            var new_user = {
                ProfileID: new_profile.ProfileID,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Description: req.body.Description,
                Resume: req.body.Resume,
                AcademicStatus: 1 //TODO: this needs to be implemented better
            }

            connection.query('INSERT INTO LdrUsers SET ?', [new_user], function(err, result) {
                if (err) throw err;

                console.log('New user added.');
                res.json('true');
            });
        });
    });

};
