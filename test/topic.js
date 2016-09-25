// test/topic.js

module.exports = function(chai, server, assert, email, password) {

  describe('/POST request to /api/topic without token', function() {
    it('Should return a JSON response indicating failure.', function(done) {
      chai.request(server)
        .post('/api/topic')
        .send({
          Title: 'Topic created during testing',
          ProfileID: 'profile_id_here.',
          Body: 'This topic was creating during testing at ' + (new Date()) + '.'
        })
        .end(function(err, res) {

          assert.notEqual(err, undefined, 'Should return an error code.');
          assert.equal(res.status, 403, 'Should return HTTP status 403.');
          assert.typeOf(res.body, 'object', 'Should return a JSON object response.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          done();

        });
    });
  });

  describe('/POST request to /api/topic with valid token, but missing form data.', function() {
    it('Should return a JSON response indicating failure.', function(done) {
      
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
            .end(function(err, res) {

              assert.notEqual(err, undefined, 'Should return an error code.');
              assert.typeOf(res.body, 'object', 'Should return a JSON object as the response.');
              assert.equal(res.status, 400, 'Should have HTTP status 400.');
              assert.equal(res.body.success, false, 'Should indicate failure.');
              done();

            });
          });
    });
  });

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

  describe('/GET request to /api/topic without valid token', function() {
    it('Should return a JSON response indicating failure.', function(done) {
      
      chai.request(server)
        .get('/api/topic')
        .end(function(err, res) {

            assert.notEqual(err, undefined, 'Should return an error code.');
            assert.typeOf(res.body, 'object', 'Should return a JSON object as the response.');
            assert.equal(res.status, 403, 'Should have HTTP status 403.');
            assert.equal(res.body.success, false, 'Should indicate failure.');
            done();

          });
    });
  });

  describe('/GET request to /api/topic with valid token.', function() {
    it('Should return a JSON response with recent topics.', function(done) {
      
      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/topic')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              assert.equal(err, undefined, 'Should not return errors.');
              assert.typeOf(res.body, 'array', 'Should return a JSON array as the response.');
              assert.equal(res.body[0].Archived, false, 'Should not return archived topics.');
              assert.equal(res.status, 200, 'Should have HTTP status 200.');
              done();

            });
          });
    });
  });

  describe('/DELETE request to /api/topic.', function() {
    it('Should return a JSON response indicating failure.', function(done) {

      // login
      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          //get topicID
          chai.request(server)
            .get('/api/topic')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              console.log('test/topic.js - res.body: ');
              console.log(res.body);

              topicID = res.body[0].TopicID;

              chai.request(server)
                .delete('/api/topic/' + topicID)
                .set('x-access-token', userToken)
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return a JSON body.');
                  assert.equal(res.status, 200, 'Should return 200 OK status.');
                  assert.equal(err, undefined, 'Should not return errors.');
                  done();
                });
            });
        });
    });
  });

}