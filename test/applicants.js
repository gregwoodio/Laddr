// test/applicants.js

module.exports = function(chai, server, assert, orgEmail, orgPass) {

  describe('/GET request to /api/applications to get list of applications.', function() {
    it('Should return JSON response indicating success', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: orgEmail,
          Password: orgPass
        })
        .end(function(err, res) {

          userToken = res.body.token;

          //need profile ID for postingf
          chai.request(server)
            .get('/api/applicants')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              assert.typeOf(res.body, 'object', 'Should return JSON object.');
              assert.equal(res.status, 200, 'Should have 200 status.');
              assert.equal(res.body.success, true, 'Should indicate success.');
              assert.notEqual(res.body.applications, undefined, 'Should return an array of user\'s applications.');
              done();
            });
        });
    });
  });

};