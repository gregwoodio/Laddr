// posting.js

module.exports = function(app, connection) {

    // Get postings
    app.get('/api/posting', function(req, res) {
        
        //if PostingID is specified, get that posting
        var postingID = req.query.PostingID;
        
        if (postingID != undefined) {
            connection.query('SELECT p.postingID, p.jobTitle, p.location, p.description, p.timestamp, o.organizationName FROM LdrPostings p JOIN LdrOrganizations o WHERE p.ProfileID = o.ProfileID AND postingID = ?', [postingID], function(err, rows) {
                if (err) throw err;
    
                res.json(rows);
            });
        } else {
            
            //PostingID not specified, get most recent postings
            //TODO: Pagination. We're going to have a lot of postings here, so add something to 
            //split up the queries into manageable chunks.
            connection.query('SELECT p.PostingID, p.JobTitle, p.Location, p.Description, p.Timestamp, p.ProfileID, o.OrganizationName FROM LdrPostings p JOIN LdrOrganizations o WHERE p.ProfileID = o.ProfileID ORDER BY p.Timestamp DESC', function(err, rows) {
                if (err) throw err;

                res.json(rows);
            });
        }
    });

    // Add a posting
    app.post('/api/posting', function(req, res) {
        var posting = {
            ProfileID: req.body.ProfileID,
            JobTitle: req.body.JobTitle,
            Location: req.body.Location,
            Description: req.body.Description
        };

        connection.query('INSERT INTO LdrPostings (PostingID, ProfileID, JobTitle, Location, Description, Timestamp) VALUES (NULL, ?, ?, ?, ?, NOW())', [posting.ProfileID, posting.JobTitle, posting.Location, posting.Location], function(err, rows) {
            if (err) throw err;
            
            console.log('Posting added = ' + posting.JobTitle);
            res.json('true');
        });
    });
};
