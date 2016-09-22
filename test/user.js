// test/user.js

module.exports = function(chai, server, assert, username, password) {

  describe('/POST request to /api/user to create a new user', function() {
    it('Should return JSON indicating success', function(done) {
      chai.request(server)
        .post('/api/user')
        .send({
          Username: username,
          Email: 'test@test.com', 
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

}