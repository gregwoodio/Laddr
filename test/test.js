// test.js

process.env.NODE_ENV = 'test';

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

var username = 'DatBoi';
var password = 'oshitwhaddup';

require('./user')(chai, server, assert, username, password);
require('./login')(chai, server, assert, username, password);
require('./profile')(chai, server, assert, username, password);
require('./topic')(chai, server, assert, username, password);