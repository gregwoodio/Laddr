// api/events.js

var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/api/events', [mw.verifyToken], function(req, res) {

    models.Application.findAll({
      where: {
        ProfileID: req.decoded.ProfileID,
        ApplicationStatus: 2
      }, 
      include: {
        model: models.Posting,
        include: {
          model: models.Profile,
          attributes: ['ProfileID'],
          include: {
            model: models.Organization
          }
        }
      }
    }).then(function(events) {

      res.json({
        success: true,
        events: events
      });
    }).catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });

  });

};