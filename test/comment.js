// test/comment.js

module.exports = function(chai, server, assert, email, password) {

  //we'll need a Topic to post these comments into
  describe('/POST request to /api/topic with valid token and valid form data.', function() {
    it('Should return a JSON response indicating success.', function(done) {
      
      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;
          profileID = res.body.profileID;
 
          chai.request(server)
            .post('/api/topic')
            .set('x-access-token', userToken)
            .send({
              Title: 'Topic created during testing',
              ProfileID: profileID,
              Body: 'This topic was creating during testing at ' + (new Date()) + '.'
            })
            .end(function(err, res) {

              assert.equal(err, undefined, 'Should not return errors..');
              assert.typeOf(res.body, 'object', 'Should return a JSON object as the response.');
              assert.equal(res.status, 200, 'Should have HTTP status 400.');
              assert.equal(res.body.success, true, 'Should indicate success.');
              done();

            });
          });
    });
  });

  describe('/POST request to /api/comment without token.', function() {
    it('Should return a JSON response indicating failure.', function(done) {
      chai.request(server)
        .post('/api/comment')
        .end(function(err, res) {

          assert.notEqual(err, undefined, 'Should return an error code.');
          assert.equal(res.status, 403, 'Should return HTTP status 403.');
          assert.typeOf(res.body, 'object', 'Should return a JSON object response.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          done();

        });
    });
  });

  describe('/POST request to /api/comment with token but invalid form data', function() {
    it('Should return a JSON response indicating failure.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res)  {

          userToken = res.body.token;

          chai.request(server)
            .post('/api/comment')
            .set('x-access-token', userToken)
            .end(function(err, res) {
              
              assert.equal(res.status, 400, 'Should return HTTP status 400.');
              assert.typeOf(res.body, 'object', 'Should return a JSON object response.');
              assert.equal(res.body.success, false, 'Should indicate failure.');
              done();
            });
        });
    });
  });

  describe('/POST request to /api/comment with token and valid form data', function() {
    it('Should return a JSON response indicating success.', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res)  {

          userToken = res.body.token;
          profileID = res.body.profileID;

          //need to get the topic ID to post to it
          chai.request(server)
            .get('/api/topic')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              topic = res.body[0];
              console.log('text/comment.js - topic: ');
              console.log(topic.TopicID);
              
              chai.request(server)
                .post('/api/comment')
                .set('x-access-token', userToken)
                .send({
                  TopicID: topic.TopicID,
                  ProfileID: profileID,
                  Body: 'This is a comment added by the unit tests at ' + (new Date()) + '.'
                })
                .end(function(err, res) {

                  // assert.equal(err, undefined, 'Should not return any errors.');
                  assert.equal(res.status, 200, 'Should return 200 OK status.');
                  assert.typeOf(res.body, 'object', 'Should return a JSON object as a response.');
                  assert.equal(res.body.success, true, 'Should indicate success.');
                  done();
                });
            });
        });
    });
  });  

  describe('/GET request to /api/comment with token but missing GET parameters', function() {
    it('Should fail.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/comment')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              assert.typeOf(res.body, 'object', 'Should return JSON object.');
              assert.equal(res.status, 404, 'Should return 404 status.');
              assert.equal(res.body.success, false, 'Should indicate failure.');
              done();

            });
        });
    });
  });

}