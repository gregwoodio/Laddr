// test/profile.js

module.exports = function(chai, server, assert, userToken) {

	describe('GET request to /api/profile.', function() {
		it('Should return the user profile given a token.', function(done) {
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
}