//test/login.js 

module.exports = function(chai, server, assert, email, password) {

	describe('POST to /api/login with no credentials provided.', function() {
		it('Should return 403 status for unsuccessful login.', function(done) {
			chai.request(server)
				.post('/api/login')
				.end(function(err, res) {
					assert.equal(res.status, 403, 'Should have a status of 403');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.message, "Missing credentials", 'Response should inform user of failure.');
					done();
				});

		});		
	});

	describe('POST to /api/login with a nonexistant email.', function() {
		it('Should return 403 status for unsuccessful login.', function(done) {
			chai.request(server)
				.post('/api/login')
				.send({Email: 'NotInTheDatabase', Password: 'nothere'})
				.end(function(err, res) {
					assert.equal(res.status, 403, 'Should have a status of 403.');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, false, 'Response should inform user of failure.');
					done();
				});

		});		
	});

	describe('POST to /api/login with incorrect credentials provided.', function() {
		it('Should return 403 status for unsuccessful login.', function(done) {
			chai.request(server)
				.post('/api/login')
				.send({Email: email, Password: 'wrongpassword'})
				.end(function(err, res) {
					assert.notEqual(err, undefined, '403 is an error status.');
					assert.equal(res.status, 403, 'Should have a status of 403.');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, false, 'Response should inform user of failure.');
					done();
				});

		});		
	});

	describe('POST to /api/login with correct login provided.', function() {
		it('Should return status 200 and a token.', function(done) {
			chai.request(server)
				.post('/api/login')
				.send({Email: email, Password: password})
				.end(function(err, res) {
					assert.equal(err, undefined, 'Should not return an error.');
					assert.equal(res.status, 200, 'Should have a status of 200.');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, true, 'Response should inform user of success.');
					done();
				});

		});		
	});

	// other HTTP methods
	describe('GET request to /api/login.', function() {
		it('Should return 404 status for method not allowed.', function(done) {
			chai.request(server)
				.get('/api/login')
				.end(function(err, res) {
					assert.notEqual(err, undefined, '404 is an error status.');
					assert.equal(res.status, 404, 'Should have a status of 404.');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, false, 'Response should inform user of failure.');
					done();
				});

		});		
	});

	describe('PUT request to /api/login.', function() {
		it('Should return 404 status for method not allowed.', function(done) {
			chai.request(server)
				.put('/api/login')
				.send({Email: email, Password: password})
				.end(function(err, res) {
					assert.notEqual(err, undefined, '404 is an error status.');
					assert.equal(res.status, 404, 'Should have a status of 405');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, false, 'Response should inform user of failure.');
					done();
				});

		});		
	});

	describe('DELETE request to /api/login.', function() {
		it('Should return 404 status for method not allowed.', function(done) {
			chai.request(server)
				.delete('/api/login')
				.send({Email: email, Password: password})
				.end(function(err, res) {
					assert.notEqual(err, undefined, '404 is an error status.');
					assert.equal(res.status, 404, 'Should have a status of 405');
					assert.typeOf(res.body, 'object', 'Should return JSON object.');
					assert.equal(res.body.success, false, 'Response should inform user of failure.');
					done();
				});

		});		
	});

}