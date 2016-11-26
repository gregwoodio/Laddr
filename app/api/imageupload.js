// imageupload.js

var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');
var multiparty = require('connect-multiparty')();
var mw = require('../middleware');

UPLOADS_PATH = path.join(__dirname, '..', 'public', 'img', 'uploads');

module.exports = function(app, models) {

  app.post('/api/imageupload', mw.verifyToken, multiparty, function(req, res) {

    var file = req.files.file;

    //file exists, generate new name
    if (file) {
      ext = file.name.split('.')[file.name.split('.').length - 1];
      newFileName = req.decoded.ProfileID + '.' + ext;

      newPath = path.join(UPLOADS_PATH, newFileName);

      fs.readFile(file.path, function(err, data) {
        fs.writeFile(newPath, data, function(err) {
          if (err) {
            return res.status(500).json({
              success: false, 
              message: err.message
            });
          }

          models.Profile.update({
            PictureURL: 'img/uploads/' + newFileName
          }, {
            where: {
              ProfileID: req.decoded.ProfileID
            }
          })
          .then(function(profile) {
            return res.json({
              success: true,
              message: 'http://laddr.xyz:3000/img/uploads/' + newFileName
            });
          })
          .catch(function(err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          });
        });
      });
    }

  });

};
