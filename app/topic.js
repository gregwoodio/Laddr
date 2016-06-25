// topic.js

var uuid = require('uuid');

module.exports = function(app, connection) {

    // Get listing of all topics.
    app.get('/api/topic', function(req, res) {
        
        //TODO: Pagination
        connection.query('SELECT * FROM LdrTopics ORDER BY Timestamp DESC', function(err, rows) {
            if (err) throw err;
            
            res.json(rows);
        });
    });

    // Add a new topic
    app.post('/api/topic', function(req, res) {
        
        var topic = {
            TopicID: uuid.v1(),
            Title: req.body.Title,
            Creator: req.body.Creator,
            Body: req.body.Body
        };

        connection.query('INSERT INTO LdrTopics (TopicID, Title, Creator, Timestamp) VALUES (?, ?, ?, NOW())', [topic.TopicID, topic.Title, topic.Creator], function(err, rows) {
            if (err) throw err;

            var commentID = uuid.v1();

            //add the first comment to the topic
            connection.query('INSERT INTO LdrComments(CommentID, Author, Timestamp, TopicID, Body) VALUES (?, ?, NOW(), ?, ?)', [commentID, topic.Creator, topic.TopicID, topic.Body], function(err, rows) {
                
                if (err) throw err;

                console.log("Topic added = \"" + topic.Title + "\"");
                res.json('true');
            });
        });
    });
};
