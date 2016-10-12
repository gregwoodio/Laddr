// imageupload.js

fs = require('fs');
jwt = require('jsonwebtoken');
var multer = require('multer');

//multer setup for file uploads
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, next) {
    next(null, './app/public/img/uploads/')
  },
  filename: function (req, file, next) {
    //rename file
    console.log('file: ' + file);

    split = file.originalname.split('.'); //get file extension
    next(null, file.originalname);
  }
});
var upload = multer({ //multer settings
  storage: storage
}).single('file');

module.exports = function(app, models) {

  app.post('/api/imageupload', function(req, res) {

    upload(req,res,function(err){
      if(err){
        console.log('unsuccessful upload');
        console.log(err.message);
        res.json({
          error_code:1,
          err_desc:err
        });
        return; 
      }

      console.log('Successful upload.');
      res.json({
        error_code:0,
        err_desc:null
      });
    });

  });

};