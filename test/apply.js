// test/apply.js

module.exports = function(chai, server, assert, orgEmail, orgPass, email, password) {

  describe('/POST to /api/posting so we have a job to apply to.', function() {
    it('Should return JSON response indicating success', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: orgEmail,
          Password: orgPass
        })
        .end(function(err, res) {

          userToken = res.body.token;

          //need profile ID for posting
          chai.request(server)
            .get('/api/profile')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              profileID = res.body.ProfileID;
              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);

              chai.request(server)
                .post('/api/posting')
                .set('x-access-token', userToken)
                .send({
                  ProfileID: profileID,
                  JobTitle: 'Applicant',
                  Location: 'Brampton',
                  Lat: 43.653956,
                  Lng: -79.739938999,
                  Description: 'Apply to this job!',
                  EventDate: tomorrow,
                  Deadline: new Date()
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

  describe('/POST to /api/apply without token', function() {
    it('Should return JSON response indicating failure', function(done) {
      chai.request(server)
        .post('/api/apply')
        .end(function(err, res) {
          
          assert.typeOf(res.body, 'object', 'Should return JSON response.');
          assert.equal(res.body.success, false, 'Should indicate failure.');
          assert.equal(res.status, 403, 'Should return status code 400.');
          done();
        });
    });
  });

  describe('/POST to /api/apply with token and required fields', function() {
    it('Should return JSON response indicating success', function(done) {
      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;

          //find postings
          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              postingID = res.body[res.body.length - 1].PostingID;

              chai.request(server)
                .post('/api/apply')
                .set('x-access-token', userToken)
                .send({
                  PostingID: postingID
                })
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return JSON object response');
                  assert.equal(res.status, 200, 'Should have 200 OK status.');
                  assert.equal(res.body.success, true, 'Should indicate successful application.');
                  done();
                });
            });
        });
    });
  });

  describe('/PUT request to /api/apply to accept the application as a different user', function() {
    it('Should return JSON indicating failure.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: email,
          Password: password
        })
        .end(function(err, res) {

          userToken = res.body.token;
          profileID = res.body.profile.ProfileID;

          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              postingID = res.body[res.body.length - 1].PostingID;

              chai.request(server)
                .put('/api/apply')
                .set('x-access-token', userToken)
                .send({
                  PostingID: postingID,
                  ProfileID: profileID,
                  ApplicationStatus: 4 //accepted!
                })
                .end(function(err, res) {

                  assert.typeOf(res.body, 'object', 'Should return JSON object response.');
                  assert.equal(res.status, 403, 'Should have 500 status.');
                  assert.equal(res.body.success, false, 'Should indicate failure.');
                  done();
                });
            });
        });
    });
  });

  describe('/PUT request to /api/apply to accept the application', function() {
    it('Should return JSON indicating success.', function(done) {

      chai.request(server)
        .post('/api/login')
        .send({
          Email: orgEmail,
          Password: orgPass
        })
        .end(function(err, res) {

          userToken = res.body.token;

          chai.request(server)
            .get('/api/posting')
            .set('x-access-token', userToken)
            .end(function(err, res) {

              postingID = res.body[res.body.length - 1].PostingID;

              chai.request(server)
                .get('/api/applicants')
                .set('x-access-token', userToken)
                .end(function(err, res) {

                  profileID = res.body.applications[0].ProfileID;

                  chai.request(server)
                    .put('/api/apply')
                    .set('x-access-token', userToken)
                    .send({
                      PostingID: postingID,
                      ProfileID: profileID,
                      ApplicationStatus: 4 //accepted!
                    })
                    .end(function(err, res) {

                      assert.typeOf(res.body, 'object', 'Should return JSON object response.');
                      assert.equal(res.status, 200, 'Should have 200 OK status.');
                      assert.equal(res.body.success, true, 'Should indicate success.');
                      done();
                    });

                });
            });
        });
    });
  });

}