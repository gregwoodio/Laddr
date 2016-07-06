// login.js

jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

	//logs into our system, returns a token
    app.post('/login', function(req, res) {

        connection.query("SELECT * FROM LdrProfiles WHERE Username = ?", [req.body.Username], function(err, rows) {
            if (err) {
                throw err;
            }
            if (!rows.length) {
                //username doesn't exist
                res.json({
                    success: false,
                    message: "Authentication failed, user not found."
                });
            } else if (!bcrypt.compareSync(req.body.Password, rows[0].Password)) {
                res.json({
                    success: false,
                    message: "Authentication failed, incorrect password."
                })
            } else {

                var profile = rows[0];

                if (profile.AccountType == 0) {
                    //user
                    connection.query("SELECT * FROM LdrUsers WHERE ProfileID = ?", [profile.ProfileID], function(err, rows) {
                        if (err) {
                            throw err;
                        }

                        user = rows[0];
                        for (var key in user) {
                            profile[key] = user[key];
                        }
                    });
                } else if (profile.AccountType == 1) {
                    //organization
                    connection.query("SELECT * FROM LdrOrganizations WHERE ProfileID = ?", [profile.ProfileID], function(err, rows) {
                        if (err) {
                            throw err;
                        }

                        org = rows[0];
                        for (var key in org) {
                            profile[key] = org[key];
                        }
                    });
                }

                var token = jwt.sign(profile, app.get('secret'), {
                    expiresIn: '1440m'
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        });
    });
};