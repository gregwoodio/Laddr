// topic.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

  // Get listing of all topics.
  app.get('/api/topic', function(req, res) {
      
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          var topicID = req.query.tid;

          if (topicID == undefined) {
            //TODO: Pagination
            connection.query('SELECT * FROM LdrTopics ORDER BY Timestamp DESC', function(err, rows) {
              if (err) throw err;
              
              res.json(rows);
            });

          } else {

            connection.query('SELECT * FROM LdrTopics WHERE TopicID = ?', [topicID], function(err, rows) {
              if (err) throw err;

              res.json(rows[0]);
            });
          }
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: "No token provided."
      });
    }
      
  });

  // Add a new topic
  app.post('/api/topic', function(req, res) {
      
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          var topic = {
            TopicID: uuid.v1(),
            Title: req.body.Title,
            Creator: decoded.Username,
            Body: req.body.Body
          };

          connection.query('INSERT INTO LdrTopics (TopicID, Title, Creator, Timestamp) VALUES (?, ?, ?, NOW())', 
          	[topic.TopicID, topic.Title, topic.Creator], function(err, rows) {

            if (err) throw err;

            var commentID = uuid.v1();

            //add the first comment to the topic
            connection.query('INSERT INTO LdrComments(CommentID, Author, Timestamp, TopicID, Body) VALUES (?, ?, NOW(), ?, ?)', 
            	[commentID, topic.Creator, topic.TopicID, topic.Body], function(err, rows) {
              
              if (err) throw err;

              console.log("Topic added = \"" + topic.Title + "\"");
              res.json({
                success: true,
                message: "Topic added."
              });
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
  });
};
