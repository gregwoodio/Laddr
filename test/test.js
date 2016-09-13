// test.js

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

userToken = "";
var getToken = function(chai, server, assert, callback) {
	//some of these tests will require a token.
	// var request = require('request');
	// request.post('http://localhost:3000/api/login', 
	// 	{form: {
	// 		Username: 'DatBoi',
	// 		Password: 'oshitwhaddup'
	// 	}}, function(err, res, body) {
	// 		if (err) throw err;
	// 		obj = JSON.parse(body);

	// 		// console.log(obj.token);
	// 		userToken = obj.token;
	// 	});
	
	chai.request(server)
		.post('/api/login')
		.send({
			Username: 'DatBoi',
			Password: 'oshitwhaddup'
		})
		.end(function(err, res) {
			if (err) throw err;

			userToken = res.body.token;
			callback(chai, server, assert);
		});
};

var runTests = function(chai, server, assert) {
	require('./login')(chai, server, assert);
	require('./profile')(chai, server, assert, userToken);
}

getToken(chai, server, assert, runTests);