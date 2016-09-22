// test/posting.js

module.exports = function(chai, server, assert, username, password) {

  describe('/POST request to /api/posting without token or parameters', function() {
    it('Should return JSON response indicating failure', function(done) {
      chai.request(server)
        .post('/api/posting')
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return JSON response.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          assert.equal(res.status, 403, 'Should return status code 400.');
          done();
        });
    });
  });

  describe('/POST request to /api/posting with token, but missing parameters', function() {
    it('Should return JSON response indicating failure', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Username: username,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .post('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              assert.typeOf(res.body, 'object', 'Should return JSON object.');
              assert.equal(res.status, 400, 'Should have 400 status.');
              assert.equal(res.body.success, false, 'Should indicate failure.');

              done();
            });
        });
    });
  });

  describe('/POST request to /api/posting with token and required parameters', function() {
    it('Should return JSON response indicating success', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Username: username,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          //need profile ID for posting
          chai.request(server)
            .get('/api/profile')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              profileID = res.body.ProfileID;

              chai.request(server)
                .post('/api/posting')
                .set('x-access-token', userToken)
                .send({
                  ProfileID: profileID,
                  JobTitle: 'Test job title',
                  Location: 'Mississauga',
                  Description: 'A test job created in Mississauga'
                })
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return JSON object.');
                  assert.equal(res.status, 200, 'Should have 200 status.');
                  assert.equal(res.body.success, true, 'Should indicate failure.');

                  done();
                });
            });
        });
    });
  });

  describe('/GET request to /api/posting without token or parameters', function() {
    it('Should return JSON response indicating failure', function(done) {
      chai.request(server)
        .get('/api/posting')
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return JSON response as an object.');
          assert.equal(res.status, 403, 'Should have 403 status.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          done();
        });
    });
  });

  describe('/GET request to /api/posting with token but without parameters', function() {
    it('Should return JSON array of postings.', function(done) {
      
      chai.request(server)
        .post('/api/login')
        .send({
          Username: username,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              assert.typeOf(res.body, 'array', 'Should return JSON response as an array.');
              assert.equal(res.status, 200, 'Should have 200 OK status.');
              // assert.equal(res.body.success, true, 'Should indicate success.');
              done();
                
            });
        });
    });
  });

  describe('/GET request to /api/posting with token and parameters', function() {
    it('Should return JSON object of specified posting.', function(done) {
      
      //need token to get posting id
      chai.request(server)
        .post('/api/login')
        .send({
          Username: username,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              postingID = res.body[0].PostingID;

              //now make request with token and specified posting
              chai.request(server)
                .get('/api/posting/' + postingID)
                .set('x-access-token', userToken)
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return JSON response as an object.');
                  assert.equal(res.status, 200, 'Should have 200 status.');
                  assert.notEqual(res.body.PostingID, undefined, 'Postings should have values.');
                  done();
                });

            });
        });
    });
  });

  describe('/GET request to /api/posting without token but with parameters', function() {
    it('Should return JSON response indicating failure.', function(done) {
      
      //need token to get posting id
      chai.request(server)
        .post('/api/login')
        .send({
          Username: username,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              postingID = res.body[0].PostingID;

              //now make request without token and specified posting
              chai.request(server)
                .get('/api/posting?id=' + postingID)
                .set('x-access-token', null)
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return JSON response as an object.');
                  assert.equal(res.status, 403, 'Should have 403 status.');
                  assert.equal(res.body.success, false, 'Should indicate failure.');
                  done();
                });

            });
        });
    });
  });
}