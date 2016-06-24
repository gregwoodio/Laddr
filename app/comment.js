// comment.js

module.exports = function(app, connection) {

    // Get one or more comments
    app.get('/api/comment', function(req, res) {
        
        var topicID = req.query.TopicID;
        var commentID = req.query.CommentID;

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
        }
    });

    // Add a comment
    app.post('/api/comment', function(req, res) {
        var comment = {
            TopicID: req.body.TopicID,
            Author: req.body.Creator, //make sure to send the logged in username
            Body: req.body.Body
        };

        connection.query('INSERT INTO LdrComments (CommentID, Author, Timestamp, TopicID, Body) VALUES (NULL, ?, NOW(), ?, ?)', [comment.Author, comment.TopicID, comment.Body], function(err, rows) {
            if (err) throw err;

            console.log("Comment added");
            res.json('true');
        });
    });
    
};
