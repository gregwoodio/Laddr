// test.js

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

require('./login')(chai, server, assert);

