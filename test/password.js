// /test/password.js

module.exports = function(chai, server, assert, email, password) {

  describe('/POST to /api/changepassword without token.', function() {
    it('Should return JSON indicating failure.', function(done) {

      chai.request(server)
        .post('/api/changepassword')
        .send({
          OldPass: password,
          NewPass: 'newpassword'
        })
        .end(function(err, res) {
          assert.typeOf(res.body, 'object', 'Should return JSON object body.');
          assert.equal(res.status, 403, 'Should return HTTP status of 403.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          done();
        });
    });
  });

  describe('/POST request to /api/changepassword with token but incorrect original password.', function() {
    it('Should return JSON indicating failure.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .post('/api/changepassword')
            .set('x-access-token', userToken)
            .send({
              OldPass: 'wrongpassword',
              NewPass: 'newpassword'
            })
            .end(function(err, res) {
              assert.typeOf(res.body, 'object', 'Should return JSON object body.');
              assert.equal(res.status, 403, 'Should return HTTP status of 403.');
              assert.equal(res.body.success, false, 'Should indicate failure.');
              done();
            });
        });
    });
  });

  describe('/POST request to /api/changepassword with token and correct credentials.', function() {
    it('Should return JSON indicating success.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .post('/api/changepassword')
            .set('x-access-token', userToken)
            .send({
              OldPass: password,
              NewPass: 'newpassword'
            })
            .end(function(err, res) {
              assert.typeOf(res.body, 'object', 'Should return JSON object body.');
              assert.equal(res.status, 200, 'Should return HTTP status of 403.');
              assert.equal(res.body.success, true, 'Should indicate failure.');
              done();
            });
        });
    });
  });

  describe('/POST request to /api/changepassword to change password back to original.', function() {
    it('Should return JSON indicating success.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: 'newpassword'
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .post('/api/changepassword')
            .set('x-access-token', userToken)
            .send({
              OldPass: 'newpassword',
              NewPass: password
            })
            .end(function(err, res) {
              assert.typeOf(res.body, 'object', 'Should return JSON object body.');
              assert.equal(res.status, 200, 'Should return HTTP status of 403.');
              assert.equal(res.body.success, true, 'Should indicate failure.');
              done();
            });
        });
    });
  });

};