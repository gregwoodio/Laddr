// test/user.js

module.exports = function(chai, server, assert, email, password) {

  describe('/POST request to /api/user to create a new user', function() {
    it('Should return JSON indicating success', function(done) {
      chai.request(server)
        .post('/api/user')
        .send({
          Email: email, 
          Password: password, 
          Picture: 'somepic.jpg', 
          FirstName: 'Test', 
          LastName: 'User', 
          Description: 'Test Description', 
          Resume: 'Test Resume'
        })
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return response as a JSON object.');
          console.log(err);
          assert.equal(err, undefined, 'Should not return errors.');
          assert.equal(res.body.success, true, 'Should indicate successful add.');
          assert.equal(res.status, 200, 'Should have a HTTP status of 200.');

          done();
        });
    });
  });

  describe('/POST request to /api/user to create user with missing parameters', function() {
    it('Should return JSON indicating failure', function(done) {
      chai.request(server)
        .post('/api/user')
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return response as a JSON object.');
          // assert.notEqual(err, undefined, 'Should return error code 400.');
          assert.equal(res.body.success, false, 'Should indicate failure to create user.');
          assert.equal(res.status, 400, 'Should have HTTP status of 400.');

          done();
        });
    });
  });

  //delete routes
  describe('/POST request to /api/user to create a new user.', function() {
    it('Should return JSON indicating success.', function(done) {
      chai.request(server)
        .post('/api/user')
        .send({
          Email: 'user_to_be_deleted@gmail.com', 
          Password: password, 
          Picture: 'somepic.jpg', 
          FirstName: 'Deleted', 
          LastName: 'User', 
          Description: 'Test Description', 
          Resume: 'Test Resume'
        })
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return response as a JSON object.');
          console.log(err);
          assert.equal(err, undefined, 'Should not return errors.');
          assert.equal(res.body.success, true, 'Should indicate successful add.');
          assert.equal(res.status, 200, 'Should have a HTTP status of 200.');

          done();
        });
    });
  });

  describe('/DELETE request to /api/user to delete user.', function() {
    it('Should return JSON indicating success.', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: 'user_to_be_deleted@gmail.com', 
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;
        
          chai.request(server)
            .delete('/api/user')
            .set('x-access-token', userToken)
            .send()
            .end(function(err, res) {

              assert.typeOf(res.body, 'object', 'Should return response as JSON object.');
              assert.equal(err, undefined, 'Should not return any errors.');
              assert.equal(res.body.success, true, 'Should indicate successful delete.');
              assert.equal(res.status, 200, 'Should have HTTP status 200.');

              done();
            });
        });
    });
  });

  describe('/POST request to /api/login as a deleted user.', function() {
    it('Should return JSON indicating failure.', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: 'user_to_be_deleted@gmail.com', 
          Password: password
        })
        .end(function(err, res) {

          assert.typeOf(res.body, 'object', 'Should return response as JSON object.');
          assert.notEqual(err, undefined, 'Should not return any errors.');
          assert.equal(res.body.success, false, 'Should indicate failure to login.');
          assert.equal(res.body.token, undefined, 'Should not return a token.');

          done();
        });
    });
  });
}