// topic.js

var uuid = require('uuid');
var jwt = require('jsonwebtoken');
var mw = require('../middleware');

module.exports = function(app, models) {

  // Get listing of all topics.
  app.get('/api/topic', [mw.verifyToken], function(req, res) {
      
    models.Topic.findAll({
        where: {
          Archived: false
        }, 
        order: [
          ['Timestamp', 'DESC']
        ],
        include: [{
          model: models.Profile,
          include: [{
            model: models.User
          }, {
            model: models.Organization
          }]
        }]
      })
      .then(function(topics) {
        for (i = 0; i < topics.length; i++) {
          topics[i].LdrProfile.Password = undefined;
        }
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
  
    models.Topic.find({
      where: {
        TopicID: req.params.id
      },
      include: {
        model: models.Profile,
        include: [
          models.User
        ]
      }
    })
    .then(function(topic) {

      topic = topic.dataValues;
      topic.LdrProfile = topic.LdrProfile.dataValues;
      delete topic.LdrProfile.Password;
      console.log('topic.js - topic: ');
      console.log(topic);

      models.Comment.findAll({
          where: {
            TopicID: req.params.id
          }, 
          order: [
            ['Timestamp', 'ASC']
          ],
          include: [
            {
              model: models.Profile,
              include: [{
                model: models.User
              }, {
                model: models.Organization
              }]
            }
          ]
        })
        .then(function(comments) {

          console.log('topic.js - comments: ');
          console.log(comments);

          for (i = 0; i < comments.length; i++) {
            comments[i].LdrProfile.Password = undefined;
          }

          res.json({
            success: true,
            topic: topic,
            comments: comments
          });
        })
        .catch(function(err) {

          console.log('topic.js - ' + err.message);

          res.status(500).json({
            success: false,
            message: err.message
          });
        });
    })
    .catch(function(err) {

      console.log('topic.js - ' + err.message);

      res.status(500).json({
        success: false,
        message: err.message
      });
    });

  });

  // Add a new topic
  app.post('/api/topic', mw.verifyToken, function(req, res) {

    if (req.body.Title == undefined || req.body.Body == undefined ||
      req.body.Title == '' || req.body.Body == '') {
      console.log('topic.js - Missing form data.');
      res.status(400).json({
        success: false,
        message: 'Missing form data.'
      });
    } else {

      topicID = uuid.v1();

      models.Topic.build({
        TopicID: topicID,
        Title: req.body.Title,
        ProfileID: req.decoded.ProfileID,
        Timestamp: new Date()
      })
      .save()
      .then(function(topic) {

        models.Comment.build({
          CommentID: uuid.v1(),
          ProfileID: req.decoded.ProfileID,
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
        console.log('topic.js - ' + err.message);
        res.status(500).json({
          success: false,
          message: err.message
        });
      });
    }
  });

  app.delete('/api/topic/:id', mw.verifyToken, function(req, res) {

    models.Topic.update({
        Archived: true
      }, { 
        where: {
          ProfileID: req.decoded.ProfileID,
          TopicID: req.params.id
        }
      })
      .then(function(topic) {
        res.json({
          success: true,
          message: 'Topic deleted.'
        });
      })
      .catch(function(err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      });

  });
};
