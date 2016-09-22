// comment.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');

module.exports = function(app, models) {

  // Method removed, now to get comments use /api/topic/:id
  app.get('/api/comment', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  });

  // Add a comment
  app.post('/api/comment', function(req, res) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (req.body.TopicID == undefined || req.body.Author == undefined || req.body.Body == undefined ||
      req.body.TopicID == '' || req.body.Author == '' || req.body.Body == undefined) {
      res.status(400).json({
        success: false,
        message: 'Missing form data.'
      });
    } else {

      if (token) {
        jwt.verify(token, app.get('secret'), function(err, decoded) {
          if (err) {
            res.status(403).json({
              success: false,
              message: "Failed to authenticate token."
            });
          } else {

            models.Comment.build({
              CommentID: uuid.v1(),
              TopicID: req.body.TopicID,
              Author: decoded.Username, 
              Body: req.body.Body
            })
            .save()
            .then(function(comment) {
              res.json({
                success: true,
                message: "Comment added."
              });
            })
            .catch(function(err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            });
          }
        });
      } else {
        res.status(403).json({
          success: false,
          message: "No token provided."
        });
      }
    }
      
  });

  app.put('/api/comment', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/comment', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
    
};
