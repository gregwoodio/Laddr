// comment.js

var uuid = require('uuid');
var mw = require('../middleware');

module.exports = function(app, models) {

  // Method removed, now to get comments use /api/topic/:id
  app.get('/api/comment', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  });

  // Add a comment
  app.post('/api/comment', mw.verifyToken, function(req, res) {

    if (req.body.TopicID == undefined  || req.body.Body == undefined ||
      req.body.TopicID == '' || req.body.Body == '') {
      res.status(400).json({
        success: false,
        message: 'Missing form data.'
      });
    } else {

      models.Comment.build({
        CommentID: uuid.v1(),
        TopicID: req.body.TopicID,
        ProfileID: req.decoded.ProfileID, 
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

        console.log('comments.js - err: ' + err.message);

        res.status(500).json({
          success: false,
          message: err.message
        });
      }); 
    }
      
  });

  app.put('/api/comment', function(req, res) {
    res.status(404).json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/comment/:id', mw.verifyToken, function(req, res) {

    models.Comment.update({
        Archived: true
      }, {
        where: {
          ProfileID: req.decoded.ProfileID,
          CommentID: req.params.id
        }
      })
      .then(function(comment) {
        res.json({
          success: true,
          message: 'Comment successfully deleted.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: 'Error deleting comment: ' + err.message
        });
      });
  });
    
};