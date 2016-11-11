// api/tag.js

var mw = require('../middleware');

module.exports = function(app, models) {

  app.get('/api/tag', [mw.verifyToken], function(req, res) {

    models.Tag.findAll().then(function(tags) {
      res.json(tags);
    })
    .catch(function(err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });

  });

};