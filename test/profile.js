// test/profile.js

module.exports = function(chai, server, assert, username, password) {

	describe('GET request to /api/profile.', function() {
		it('Should return the user profile given a token.', function(done) {

			chai.request(server)
				.post('/api/login')
				.send({
					Username: username,
					Password: password
				})
				.end(function(err, res) {
					userToken = res.body.token;

					chai.request(server)
						.get('/api/profile')
						.set('x-access-token', userToken)
						.end(function(err, res) {
							assert.notEqual(res.body, undefined, 'Should have some value if signed in.');
							assert.typeOf(res.body, 'object', 'Should return an object.');
							assert.notEqual(res.body.Username, undefined, 'Response should include username.');
							assert.notProperty(res, 'Password', 'Should not return password.');
							done();
						});
				});
		});
	});

	describe('GET request to /api/profile without token.', function() {
		it('Should return JSON response indicating failure.', function(done) {

			chai.request(server)
				.get('/api/profile')
				.end(function(err, res) {
					assert.notEqual(res.body, undefined, 'Should return a failure message.');
					assert.typeOf(res.body, 'object', 'Should return an object.');
					assert.equal(res.body.success, false, 'Success should be false.');
					done();
				});
		});
	});

	describe('GET request to /api/profile without valid token.', function() {
		it('Should return JSON response indicating failures.', function(done) {

			chai.request(server)
				.get('/api/profile')
				.set('x-access-token', 'invalidtoken')
				.end(function(err, res) {
					assert.notEqual(res.body, undefined, 'Should return a failure message.');
					assert.typeOf(res.body, 'object', 'Should return an object.');
					assert.equal(res.body.success, false, 'Should indicate failure.');
					done();
				});
		});
	});

	//other HTTP methods
	describe('POST request to /api/profile.', function() {
		it('Should return 404 error.', function(done) {

			chai.request(server)
				.post('/api/login')
				.send({
					Username: username,
					Password: password
				})
				.end(function(err, res) {
					userToken = res.body.token;

					chai.request(server)
						.post('/api/profile')
						.set('x-access-token', userToken)
						.end(function(err, res) {
							assert.notEqual(err, undefined, 'Should return 404 error.');
							assert.typeOf(res.body, 'object', 'Should return an object.');
							assert.equal(res.body.success, false, 'Response should indicate failure.');
							assert.equal(res.status, 404, 'Should have a status of 404');
							done();
						});
				});
		});
	});

	describe('PUT request to /api/profile.', function() {
		it('Should return 404 error.', function(done) {

			chai.request(server)
				.post('/api/login')
				.send({
					Username: username,
					Password: password
				})
				.end(function(err, res) {
					userToken = res.body.token;

					chai.request(server)
						.put('/api/profile')
						.set('x-access-token', userToken)
						.end(function(err, res) {
							assert.notEqual(err, undefined, 'Should return 404 error.');
							assert.typeOf(res.body, 'object', 'Should return an object.');
							assert.equal(res.body.success, false, 'Response should indicate failure.');
							assert.equal(res.status, 404, 'Should have a status of 404');
							done();
						});
				});
		});
	});

	describe('DELETE request to /api/profile.', function() {
		it('Should return 404 error.', function(done) {

			chai.request(server)
				.post('/api/login')
				.send({
					Username: username,
					Password: password
				})
				.end(function(err, res) {
					userToken = res.body.token;

					chai.request(server)
						.delete('/api/profile')
						.set('x-access-token', userToken)
						.end(function(err, res) {
							assert.notEqual(err, undefined, 'Should return 404 error.');
							assert.typeOf(res.body, 'object', 'Should return an object.');
							assert.equal(res.body.success, false, 'Response should indicate failure.');
							assert.equal(res.status, 404, 'Should have a status of 404');
							done();
						});
				});
		});
	});

}