// comment.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');

module.exports = function(app, connection) {

  // Get one or more comments
  app.get('/api/comment', function(req, res) {
      
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if (err) {
          res.status(403).json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          var topicID = req.query.tid;
          var commentID = req.query.cid;

          if (topicID != undefined) {
            //get comments from a particular topic
            //TODO: Pagination
            connection.query('SELECT * FROM LdrComments WHERE TopicID = ?', [topicID], function(err, rows, fields) {
              if (err) throw err;

              console.log('Viewing Topic: ' + topicID);
              res.json(rows);
            });
                
          } else if (commentID != undefined) {
            //get specific comment by ID
            connection.query('SELECT * FROM LdrComments WHERE CommentID = ?', [commentID], function(err, rows, fields) {
              if (err) throw err;
  
              console.log('Viewing Comment: ' + commentID);
              res.json(rows);
            });
          } else {
            res.status(400).json({
              success: false,
              message: 'Expected tid or cid GET parameter'
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
            var comment = {
              CommentID: uuid.v1(),
              TopicID: req.body.TopicID,
              Author: decoded.Username, 
              Body: req.body.Body
            };

            connection.query('INSERT INTO LdrComments (CommentID, Author, Timestamp, TopicID, Body) VALUES (?, ?, NOW(), ?, ?)', 
              [comment.CommentID, comment.Author, comment.TopicID, comment.Body], function(err, rows) {
                
              if (err) throw err;

              console.log("Comment added");
              res.json({
                success: true,
                message: "Comment added."
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
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 

  app.delete('/api/comment', function(req, res) {
    res.status(404);
    res.json({
      success: false,
      message: 'Method not allowed.'
    });
  }); 
    
};
