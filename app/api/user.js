// user.js

uuid = require('uuid');
bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

    // Get user
    app.get('/api/user', function(req, res) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Failed to authenticate token."
                    });
                } else {
                    //What info to expose here?
                    //Is this for the public profile, or personal profile?
                    connection.query('SELECT * FROM LdrUsers u INNER JOIN LdrProfiles p ON u.ProfileID = p.ProfileID WHERE p.ProfileID = ?', [decoded.ProfileID], function(err, rows, fields) {
                        if (err) throw err;

                        res.json(rows[0]);
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

    // Add user
    app.post('/api/user', function(req, res) {
        
        //TODO: Validate info first

        bcrypt.hash(req.body.Password, 10, function(err, hash) {

            var new_profile = {
                ProfileID: uuid.v1(),
                Username: req.body.Username,
                Email: req.body.Email,
                PictureURL: req.body.Picture,
                Password: hash,
                //Timestamp: NOW(), //TODO: also needs to be fixed somehow
                AccountType: 0
            };

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
                    res.json({
                        success: true,
                        message: "New user added."
                    });
                });
            }); 
        });
    });
};