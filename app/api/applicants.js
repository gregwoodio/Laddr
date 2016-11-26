// applicants.js

var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/api/applicants', mw.verifyToken, function(req, res) {

    models.Application.findAll({
        include: [{
          model: models.Posting,
          where: {
            ProfileID: req.decoded.ProfileID
          }
        }, {
          model: models.Profile,
          include: [{
            model: models.User
          }]
          // where: {
          //   ProfileID:  
          // }
        }]
      })
      .then(function(applications) {
        for (i = 0; i < applications.length; i++) {
          applications[i].LdrProfile.Password = undefined;
        }

        res.json({
          success: true,
          applications: applications
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

  });

}