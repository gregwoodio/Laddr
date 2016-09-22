// topic.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var mw = require('../middleware');

module.exports = function(app, models) {

  // Get listing of all topics.
  app.get('/api/topic', [mw.verifyToken], function(req, res) {
      
    models.Topic.findAll()
      .then(function(topics) {
        res.json(topics);
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      }); 
      
  });

  // get Comments from one Topic
  app.get('/api/topic/:id', [mw.verifyToken], function(req, res) {
  
    models.Comment.findAll({
        where: {
          TopicID: req.params.id
        }
      })
      .then(function(comments) {
        res.json(comments);
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

  });

  // Add a new topic
  app.post('/api/topic', function(req, res) {
      
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (req.body.Title == undefined || req.body.Creator == undefined || req.body.Body == undefined ||
      req.body.Title == '' || req.body.Creator == '' || req.body.Body == '') {
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
              message: 'Failed to authenticate token.'
            });
          } else {

            topicID = uuid.v1();

            models.Topic.build({
              TopicID: topicID,
              Title: req.body.Title,
              Creator: decoded.Username,
              Timestamp: new Date()
            })
            .save()
            .then(function(topic) {

              models.Comment.build({
                CommentID: uuid.v1(),
                Author: decoded.Username,
                Timestamp: new Date(),
                TopicID: topicID,
                Body: req.body.Body
              })
              .save()
              .then(function(comment) {

                res.json({
                  success: true,
                  message: 'New topic added.',
                  id: topic.TopicID
                });
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

  //TODO: Delete Route
};
